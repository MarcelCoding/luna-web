import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {IdHolder} from "../../../../api/api.domain";
import {filter, map, mergeMap, Observable, switchMap, tap} from "rxjs";
import {CactiCareGroupService} from "../../../../api/cacti/cacti-care-group.service";
import {Entity, SearchResult} from "../../../../components/text-field/text-field.component";
import {CactiGenusService} from "../../../../api/cacti/cacti-genus.service";
import {CactiSpecieService} from "../../../../api/cacti/cacti-specie.service";
import {CactiFormService} from "../../../../api/cacti/cacti-form.service";
import {Cactus, Form} from "../../../../api/cacti/cacti.domain";
import {formatISO, intervalToDuration} from "date-fns";
import {formatDuration, parseDuration} from "../../../../utils/time";
import {EndpointService} from "../../../../api/endpoint/endpoint.service";
import {CactiCactusService} from "../../../../api/cacti/cacti-cactus.service";

function isoTimestampToDate(iso?: string): string | null {
  if (!iso) {
    return null;
  }

  return formatISO(new Date(iso), {representation: 'date'});
}

function parseAcquisitionAge(date?: string, iso?: string): string | null {
  if (!iso) {
    return null;
  }

  const start = date ? new Date(date) : new Date();
  const {years, months} = parseDuration(iso, true, start);

  if (!years && !months) {
    return null;
  }

  return `${years} + ${months}`;
}

function calculateAge(born: string, died?: string): string {
  const duration = intervalToDuration({
    start: new Date(born),
    end: died ? new Date(died) : new Date()
  });

  return formatDuration(duration);
}

@Component({
  selector: 'app-cacti-cactus-form',
  templateUrl: './cacti-cactus-form.component.html',
  styleUrls: ['./cacti-cactus-form.component.scss']
})
export class CactiCactusFormComponent implements OnChanges {

  @Input() public cactus?: Cactus;

  public readonly form = new UntypedFormGroup({
    number: new UntypedFormControl(null, Validators.required),
    genusId: new UntypedFormControl(),
    specieId: new UntypedFormControl(),
    formId: new UntypedFormControl(),
    fieldNumber: new UntypedFormControl(),
    flowerColor: new UntypedFormControl(),
    synonymes: new UntypedFormControl(),

    state: new UntypedFormGroup({
      age: new UntypedFormControl({value: '', disabled: true}),
      vitality: new UntypedFormControl(),
      noLongerInPossessionReason: new UntypedFormControl(),
      noLongerInPossessionTimestamp: new UntypedFormControl()
    }),

    acquisition: new UntypedFormGroup({
      timestamp: new UntypedFormControl(null),
      place: new UntypedFormControl(),
      age: new UntypedFormControl(null, Validators.pattern(/\d+\s*\+\s*\d+/)),
      plantType: new UntypedFormControl(),
    }),

    careGroup: new UntypedFormGroup({
      id: new UntypedFormControl(),
      home: new UntypedFormControl(),
      soil: new UntypedFormControl(),

      growTime: new UntypedFormGroup({
        light: new UntypedFormControl(),
        air: new UntypedFormControl(),
        temperature: new UntypedFormControl(),
        humidity: new UntypedFormControl(),
        other: new UntypedFormControl()
      }),

      restTime: new UntypedFormGroup({
        light: new UntypedFormControl(),
        air: new UntypedFormControl(),
        temperature: new UntypedFormControl(),
        humidity: new UntypedFormControl(),
        other: new UntypedFormControl()
      })
    })
  });

  constructor(
    private readonly endpointService: EndpointService,
    public readonly genusService: CactiGenusService,
    public readonly specieService: CactiSpecieService,
    public readonly formService: CactiFormService,
    public readonly careGroupService: CactiCareGroupService,
    private readonly cactusService: CactiCactusService
  ) {
  }

  public get base(): string {
    return this.endpointService.current();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['cactus']) {
      const cactus: Cactus = changes['cactus'].currentValue;

      this.form.reset();

      if (cactus) {
        const value = {
          number: cactus.number,
          genusId: cactus.genusId,
          specieId: cactus.specieId,
          formId: cactus.formId,
          fieldNumber: cactus.fieldNumber,
          flowerColor: cactus.flowerColor,
          synonymes: cactus.synonymes,

          state: {
            ...(
              cactus.state
                ? {
                  vitality: cactus.state ? cactus.state.vitality : null,
                  noLongerInPossessionReason: cactus.state ? cactus.state.noLongerInPossessionReason : null,
                  noLongerInPossessionTimestamp: cactus.state ? isoTimestampToDate(cactus.state.noLongerInPossessionTimestamp) : null
                }
                : {vitality: null, noLongerInPossessionReason: null, noLongerInPossessionTimestamp: null}
            ),
            ...(
              cactus.acquisition?.born
                ? {age: calculateAge(cactus.acquisition.born, cactus.state?.noLongerInPossessionTimestamp)}
                : {age: null}
            )
          },

          acquisition: cactus.acquisition ? {
            timestamp: isoTimestampToDate(cactus.acquisition.timestamp),
            place: cactus.acquisition.place,
            age: parseAcquisitionAge(cactus.acquisition.timestamp, cactus.acquisition.age),
            plantType: cactus.acquisition.plantType
          } : null,

          careGroup: cactus.careGroup ? {
            id: cactus.careGroup.id,
            home: cactus.careGroup.home,
            soil: cactus.careGroup.soil,

            growTime: cactus.careGroup.growTime ? {
              light: cactus.careGroup.growTime.light,
              air: cactus.careGroup.growTime.air,
              temperature: cactus.careGroup.growTime.temperature,
              humidity: cactus.careGroup.growTime.humidity,
              other: cactus.careGroup.growTime.other
            } : null,

            restTime: cactus.careGroup.restTime ? {
              light: cactus.careGroup.restTime.light,
              air: cactus.careGroup.restTime.air,
              temperature: cactus.careGroup.restTime.temperature,
              humidity: cactus.careGroup.restTime.humidity,
              other: cactus.careGroup.restTime.other
            } : null
          } : {id: null, growTime: null, restTime: null, home: null, soil: null}
        };

        console.log(JSON.stringify(value));

        this.form.setValue(value);
      }
    }
  }

  public get<T>(type: { get(id: string): Observable<T> }): (id: string) => Observable<T> {
    return id => type.get(id);
  }

  public search<I, T extends IdHolder<I> & { name: string }>(type: { search(term: string): Observable<T[]> }): (id: string) => Observable<SearchResult> {
    return term => type.search(term)
      .pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === term.toLowerCase()),
        result
      })));
  }

  public searchSpecie(): (id: string) => Observable<SearchResult> {
    const genusId = this.form.get('genusId')?.value;

    return term => (genusId ? this.specieService.searchWithGenus(term, genusId) : this.specieService.search(term))
      .pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === term.toLowerCase()),
        result
      })));
  }

  public searchForms(): (id: string) => Observable<SearchResult> {
    const specieId = this.form.get('specieId')?.value;
    const genusId = this.form.get('genusId')?.value;


    return term => {
      let forms: Observable<Form[]>;

      if (specieId) {
        forms = this.formService.searchWithSpecie(term, specieId);
      }
      else if (genusId) {
        forms = this.formService.searchWithGenus(term, genusId);
      }
      else {
        forms = this.formService.search(term);
      }

      return forms.pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === term.toLowerCase()),
        result
      })));
    };
  }

  public applyGenus({id}: Entity): void {
    this.genusService.get(id)
      .pipe(
        map(() => this.form.get('specieId')?.value),
        filter(specieId => specieId),
        switchMap(specieId => this.specieService.get(specieId)),
        filter(specie => specie.genusId !== id)
      )
      .subscribe(() => this.form.patchValue({specieId: null, formId: null}));
  }

  public applySpecie({id}: Entity): void {
    this.specieService.get(id)
      .pipe(
        tap(specie => this.form.get("genusId")?.setValue(specie.genusId)),
        map(() => this.form.get('formId')?.value),
        filter(formId => formId),
        switchMap(formId => this.formService.get(formId)),
        filter(form => form.specieId !== id)
      )
      .subscribe(() => this.form.get('specieId')?.setValue(null));
  }

  public applyForm({id}: Entity): void {
    this.formService.get(id)
      .pipe(
        tap(form => this.form.get('specieId')?.setValue(form.specieId)),
        mergeMap(form => this.specieService.get(form.specieId))
      )
      .subscribe(specie => this.form.get("genusId")?.setValue(specie.genusId));
  }

  public applyCareGroup({id}: Entity): void {
    this.careGroupService.get(id)
      .subscribe(careGroup => this.form.get('careGroup')?.setValue({
        id: careGroup.id,
        home: careGroup.home,
        soil: careGroup.soil,

        growTime: careGroup.growTime ? {
          light: careGroup.growTime.light,
          air: careGroup.growTime.air,
          temperature: careGroup.growTime.temperature,
          humidity: careGroup.growTime.humidity,
          other: careGroup.growTime.other
        } : null,

        restTime: careGroup.restTime ? {
          light: careGroup.restTime.light,
          air: careGroup.restTime.air,
          temperature: careGroup.restTime.temperature,
          humidity: careGroup.restTime.humidity,
          other: careGroup.restTime.other
        } : null
      }));
  }

  public trackBy<T>(index: number, {id}: IdHolder<T>): T {
    return id;
  }

  public upload(images: FileList): void {
    if (this.cactus?.id) {
      this.cactusService.uploadImages(this.cactus.id, images)
        .subscribe(() => {
          if (!this.cactus?.images) {
            return;
          }
          for (let i = 0; i < images.length; i++) {
            this.cactus.images.push(images.item(i)!.name);

          }
        });
    }
  }

  public createGenus = (name: string): Observable<Entity> => {
    return this.genusService.add({name});
  };
  public createSpecie = (name: string): Observable<Entity> => {
    const genusId = this.form.get('genusId')?.value;

    if (!genusId) {
      throw new Error("TODO: create specie only if genusId is set");
    }

    return this.specieService.add({name, genusId});
  };

  public createForm = (name: string): Observable<Entity> => {
    const specieId = this.form.get('specieId')?.value;

    if (!specieId) {
      throw new Error("TODO: create form only if specieId is set");
    }

    return this.formService.add({name, specieId});
  };
}
