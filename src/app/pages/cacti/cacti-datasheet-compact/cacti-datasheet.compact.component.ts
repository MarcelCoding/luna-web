import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, distinctUntilChanged, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { combineLatest, EMPTY, forkJoin, Observable, Subscription, throwError } from 'rxjs';
import { DateTime, Duration } from 'luxon/src/luxon';
import { ComponentCanDeactivate } from '../../../core/pending-changes.guard';
import {
  CactiService,
  Cactus,
  CactusHistoryEntry,
  CactusState,
  CareGroup,
  Form,
  Genus,
  Specie
} from '../../../core/data/cacti';
import { EndpointService } from '../../../core/data/endpoints/endpoint.service';
import { CactiHistoryEntryComponent } from '../cacti-history-entry/cacti-history-entry.component';
import { IdHolder } from '../../../core/data';
import { ButtonComponent } from '../../../core/components/button/button.component';

interface LocalCactus {
  number: string;
  genus: {
    id?: string;
    name?: string;
  };
  specie: {
    id?: string;
    name?: string;
  };
  form: {
    id?: string;
    name?: string;
  };
  fieldNumber?: string;
  flowerColor?: string;
  images?: string[];
  synonymes?: string;
  state: CactusState & { age?: string };
  acquisition: LocalCactusAcquisition;
  careGroup?: CareGroup;
}

export interface LocalCactusAcquisition {
  timestamp?: string;
  age?: string;
  place?: string;
  plantType?: string;
}

@Component({
  selector: 'app-cacti-datasheet-compact',
  templateUrl: './cacti-datasheet.compact.component.html',
  styleUrls: ['./cacti-datasheet.compact.component.scss']
})
export class CactiDatasheetCompactComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  /**
   * form = new FormGroup({
        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
        last: new FormControl('Drew', Validators.required)
      });
   */

  public readonly form = this.fb.group({
    number: [ '', Validators.required ],

    genus: this.fb.group({ id: '', name: '' /* TODO: update name, if the name in the cacti selection changes */ }),
    specie: this.fb.group({ id: '', name: '' /* TODO: update name, if the name in the cacti selection changes */ }),
    form: this.fb.group({ id: '', name: '' /* TODO: update name, if the name in the cacti selection changes */ }),

    fieldNumber: '',
    flowerColor: '',

    synonymes: '',

    state: this.fb.group({
      age: { value: '', disabled: true },
      noLongerInPossessionTimestamp: '',
      noLongerInPossessionReason: '',
      vitality: ''
    }),

    acquisition: this.fb.group({
      timestamp: '',
      age: '',
      place: '',
      plantType: ''
    }),

    careGroup: this.fb.group({
      id: '',
      name: '',

      home: '',
      soil: '',

      growTime: this.fb.group({
        light: '',
        air: '',
        temperature: '',
        humidity: '',
        other: ''
      }),

      restTime: this.fb.group({
        light: '',
        air: '',
        temperature: '',
        humidity: '',
        other: ''
      })
    })
  });

  readonly searchedGenre: Observable<Genus[]>;
  readonly searchedSpecies: Observable<Specie[]>;
  readonly searchedForms: Observable<Form[]>;
  readonly searchedCareGroups: Observable<CareGroup[]>;
  cactusHistory?: CactusHistoryEntry[];
  cactusId?: string;
  images?: string[];
  @ViewChildren(CactiHistoryEntryComponent)
  private historyEntries!: QueryList<CactiHistoryEntryComponent>;
  @ViewChild('saveButton')
  private saveButton!: ButtonComponent;
  @ViewChild('historySaveButton')
  private historySaveButton!: ButtonComponent;
  private paramsSubscription?: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly cactiApiService: CactiService,
    private readonly endpointService: EndpointService
  ) {
    this.searchedGenre = this.form.get('genus.name')!.valueChanges
      .pipe(distinctUntilChanged(), map(value => this.searchGenre(value)));

    // TODO:
    // this.form.get('specie.name')?.disable();
    // this.form.get('specie.name')?.enable();
    // this.form.get('form.name')?.disable();
    // this.form.get('form.name')?.enable();

    this.searchedSpecies = combineLatest([ this.form.get('specie.name')!.valueChanges, this.form.get('genus.id')!.valueChanges ])
      .pipe(distinctUntilChanged(CactiDatasheetCompactComponent.compare), map(([ specieName, genusId ]) => this.searchSpecies(specieName, genusId)));

    this.searchedForms = combineLatest([ this.form.get('form.name')!.valueChanges, this.form.get('specie.id')!.valueChanges ])
      .pipe(distinctUntilChanged(CactiDatasheetCompactComponent.compare), map(([ formName, specieId ]) => this.searchForms(formName, specieId)));

    this.searchedCareGroups = this.form.get('careGroup.name')!.valueChanges
      .pipe(distinctUntilChanged(), map(value => this.searchCareGroups(value)));
  }

  get showAddGenus(): boolean {
    const value = this.form.get('genus.name')?.value?.trim();
    return value && !this.cactiApiService.getGenusByName(value);
  }

  get showAddSpecie(): boolean {
    const genusId = this.form.get('genus.id')?.value;
    const specieName = this.form.get('specie.name')?.value?.trim();
    return genusId && specieName && !this.cactiApiService.getSpecieByNameAndGenus(specieName, genusId);
  }

  get showAddForm(): boolean {
    const specieId = this.form.get('specie.id')?.value;
    const formName = this.form.get('form.name')?.value?.trim();
    return specieId && formName && !this.cactiApiService.getFormByNameAndSpecie(formName, specieId);
  }

  get base(): string {
    return this.endpointService.selected || '';
  }

  private static compare(a: string[], b: string[]): boolean {
    return a[0] === b[0] && a[1] === b[1];
  }

  private static format(duration: Duration): string {
    const format = duration.shiftTo('years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds').toFormat('y M d h m s S').split(' ');
    const name = [[ 'Jahr', 'Jahre' ], [ 'Monat', 'Monate' ], [ 'Tag', 'Tage' ], [ 'Stunde', 'Stunden' ], [ 'Minute', 'Minuten' ], [ 'Sekunde', 'Sekunden' ], [ 'Millisekunde', 'Millisekunden' ]];

    const result = [];

    let i = 0;
    for (const formatElement of format) {
      if (formatElement !== '0') {
        result.push(`${formatElement} ${formatElement === '1' ? name[i][0] : name[i][1]}`);
        if (result.length === 2) {
          break;
        }
      }
      i++;
    }

    return result.join(' und ');
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .pipe(
        filter(params => params.cactusId),
        switchMap(params => forkJoin([
          this.cactiApiService.getCactus(params.cactusId),
          this.cactiApiService.getCactusHistory(params.cactusId)
        ]))
      )
      .subscribe(([ cactus, history ]) => {
        this.loadCactus(cactus);
        this.cactusHistory = history;
      });
  }

  ngOnDestroy() {
    this.paramsSubscription?.unsubscribe();
  }

  canDeactivate(): boolean | Observable<boolean> {
    return !this.form.dirty;
  }

  public selectGenus(id: string): void {
    if (id === 'new') {
      const genusName = this.form.get('genus.name')?.value;

      this.cactiApiService.addGenus(genusName.trim())
        .subscribe(genus => {
          this.form.get('genus')?.setValue(genus);
          this.form.get('specie')?.reset();
          this.form.get('form')?.reset();
        });
      return;
    }

    const genus = this.cactiApiService.getGenus(id);

    if (genus) {
      this.form.get('genus')?.setValue(genus);
      this.form.get('specie')?.reset();
      this.form.get('form')?.reset();
    }
  }

  public selectSpecie(id: string): void {
    if (id === 'new') {
      const genusId = this.form.get('genus.id')?.value;
      const specieName = this.form.get('specie.name')?.value;

      this.cactiApiService.addSpecie(specieName.trim(), genusId)
        .subscribe(specie => {
          this.form.get('specie')?.patchValue(specie);
          this.form.get('form')?.reset();
        });
      return;
    }

    const specie = this.cactiApiService.getSpecie(id);

    if (specie) {
      this.form.get('specie')?.patchValue(specie);
      this.form.get('form')?.reset();
    }
  }

  public selectForm(id: string): void {
    if (id === 'new') {
      const specieId = this.form.get('specie.id')?.value;
      const formName = this.form.get('form.name')?.value;

      this.cactiApiService.addForm(formName.trim(), specieId)
        .subscribe(form => this.form.controls.form.patchValue(form));
      return;
    }

    const form = this.cactiApiService.getForm(id);

    if (form) {
      this.form.get('form')?.patchValue(form);
    }
  }

  public selectCareGroup(id: string): void {
    const careGroup = this.cactiApiService.getCareGroup(id);

    if (careGroup) {
      this.form.get('careGroup')?.setValue(careGroup);
    }
  }

  public trackBy(index: number, { id }: IdHolder): string {
    return id;
  }

  public historyTrackBy(index: number, { date }: CactusHistoryEntry): string {
    return date;
  }

  public saveCactus(): void {
    if (!this.cactusId) {
      throw new Error('this.cactusId is not set...');
    }

    if (!this.form.valid) {
      this.saveButton.setType('red');
      return;
    }

    const local: LocalCactus = this.form.value;
    const [ years, months ] = local.acquisition.age?.split('+')?.map(value => Number(value) || 0) || [ 0, 0 ];

    const cactus: Cactus = {
      id: this.cactusId,
      number: local.number,

      genusId: local.genus.id,
      specieId: local.specie.id,
      formId: local.form.id,

      fieldNumber: local.fieldNumber,
      flowerColor: local.flowerColor,
      images: this.images,
      synonymes: local.synonymes,

      acquisition: {
        age: Duration.fromObject({ years, months }).shiftTo('days').toISO(),
        timestamp: !local.acquisition.timestamp ? undefined : DateTime.fromISO(local.acquisition.timestamp).toISO(),
        place: local.acquisition.place,
        plantType: local.acquisition.plantType
      },
      state: {
        noLongerInPossessionTimestamp: !local.state.noLongerInPossessionTimestamp ? undefined : DateTime.fromISO(local.state.noLongerInPossessionTimestamp).toISO(),
        noLongerInPossessionReason: local.state.noLongerInPossessionReason,
        vitality: local.state.vitality
      },
      careGroup: local.careGroup
    };

    this.cactiApiService.updateCactus(this.cactusId, cactus)
      .subscribe({
        next: cactus => {
          this.loadCactus(cactus);
          this.saveButton.setType('green');
        },
        error: () => this.saveButton.setType('red')
      });
  }

  public saveHistory(): void {
    forkJoin(this.historyEntries.map(entry => entry.saveEntry()))
      .pipe(
        tap(() => this.historySaveButton.setType('green')),
        catchError(error => {
          this.historySaveButton.setType('red');
          return throwError(() => error);
        }),
        switchMap(() => !this.cactusId ? EMPTY.pipe(take(1)) : this.cactiApiService.getCactusHistory(this.cactusId))
      )
      .subscribe(history => this.cactusHistory = history);
  }

  uploadFiles(images: FileList): void {
    if (this.cactusId) {
      this.cactiApiService.uploadCactusImages(this.cactusId, images)
        .subscribe(() => {
          for (let i = 0; i < images.length; i++) {
            this.images?.push(images.item(i)!.name);
          }
        });
    }
  }

  private searchGenre(value?: string): Genus[] {
    value = value?.toLowerCase().trim() || '';
    return this.handleSearchResults('genus', value, this.cactiApiService.searchGenre(value));
  }

  private searchSpecies(specieName: string, genusId: string): Specie[] {
    specieName = specieName?.toLowerCase().trim() || '';
    return !genusId ? [] : this.handleSearchResults('specie', specieName, this.cactiApiService.searchSpecies(genusId, specieName));
  }

  private searchForms(formName: string, specieId: string): Form[] {
    formName = formName?.toLowerCase().trim() || '';
    return !specieId ? [] : this.handleSearchResults('form', formName, this.cactiApiService.searchForms(specieId, formName));
  }

  private searchCareGroups(value: string): CareGroup[] {
    value = value?.toLowerCase().trim() || '';
    return this.handleSearchResults('careGroup', value, this.cactiApiService.searchCareGroups(value));
  }

  private handleSearchResults<T extends { id: string, name: string }>(formPath: string, value: string, results: T[]): T[] {
    const idControl = this.form.get(`${formPath}.id`);

    for (const result of results) {
      if (result.name.toLowerCase() === value) {
        idControl?.setValue(result.id);
        this.form.get(`${formPath}.name`)?.setValue(result.name);
        return results;
      }
    }

    idControl?.reset();
    return results;
  }

  private loadCactus(cactus: Cactus): void {
    const genus = !cactus.genusId ? undefined : this.cactiApiService.getGenus(cactus.genusId);
    const specie = !cactus.specieId ? undefined : this.cactiApiService.getSpecie(cactus.specieId);
    const form = !cactus.formId ? undefined : this.cactiApiService.getForm(cactus.formId);

    this.cactusId = cactus.id;
    const age = !cactus.age ? undefined : CactiDatasheetCompactComponent.format(Duration.fromISO(cactus.age));

    let acquisitionAge: { years: number, months: number } | undefined;
    if (cactus.acquisition?.age) {
      const age = Duration.fromISO(cactus.acquisition.age).shiftTo('years', 'months').toObject();

      acquisitionAge = {
        years: age.years || 0,
        months: age.months || 0
      };
    }

    const local: LocalCactus = {
      number: cactus.number,

      genus: { id: genus?.id, name: genus?.name },
      specie: { id: specie?.id, name: specie?.name },
      form: { id: form?.id, name: form?.name },

      fieldNumber: cactus.fieldNumber,
      flowerColor: cactus.flowerColor,
      synonymes: cactus.synonymes,

      acquisition: {
        timestamp: !cactus.acquisition?.timestamp ? undefined : DateTime.fromISO(cactus.acquisition?.timestamp).toISODate(),
        age: `${acquisitionAge?.years} + ${acquisitionAge?.months}`,
        place: cactus.acquisition?.place,
        plantType: cactus.acquisition?.plantType
      },
      state: {
        age,
        noLongerInPossessionTimestamp: !cactus.state?.noLongerInPossessionTimestamp ? undefined : DateTime.fromISO(cactus.state?.noLongerInPossessionTimestamp).toISODate(),
        noLongerInPossessionReason: cactus.state?.noLongerInPossessionReason,
        vitality: cactus.state?.vitality
      },
      careGroup: cactus.careGroup
    };

    this.form.reset();
    this.form.patchValue(local);
    this.images = cactus.images;
  }
}
