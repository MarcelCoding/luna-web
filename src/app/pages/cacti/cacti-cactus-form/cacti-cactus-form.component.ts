import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IdHolder} from "../../../../api/api.domain";
import {filter, map, mergeMap, Observable, switchMap, tap} from "rxjs";
import {CactiCareGroupService} from "../../../../api/cacti/cacti-care-group.service";
import {Entity, SearchResult} from "../../../../components/text-field/text-field.component";
import {CactiGenusService} from "../../../../api/cacti/cacti-genus.service";
import {CactiSpecieService} from "../../../../api/cacti/cacti-specie.service";
import {CactiFormService} from "../../../../api/cacti/cacti-form.service";
import {Cactus} from "../../../../api/cacti/cacti.domain";
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

  public readonly form = new FormGroup({
    number: new FormControl(null, Validators.required),
    genusId: new FormControl(),
    specieId: new FormControl(),
    formId: new FormControl(),
    fieldNumber: new FormControl(),
    flowerColor: new FormControl(),
    synonymes: new FormControl(),

    state: new FormGroup({
      age: new FormControl({value: '', disabled: true}),
      vitality: new FormControl(),
      noLongerInPossessionReason: new FormControl(),
      noLongerInPossessionTimestamp: new FormControl()
    }),

    acquisition: new FormGroup({
      timestamp: new FormControl(null),
      place: new FormControl(),
      age: new FormControl(null, Validators.pattern(/\d+\s*\+\s*\d+/)),
      plantType: new FormControl(),
    }),

    careGroup: new FormGroup({
      id: new FormControl(),
      home: new FormControl(),
      soil: new FormControl(),

      growTime: new FormGroup({
        light: new FormControl(),
        air: new FormControl(),
        temperature: new FormControl(),
        humidity: new FormControl(),
        other: new FormControl()
      }),

      restTime: new FormGroup({
        light: new FormControl(),
        air: new FormControl(),
        temperature: new FormControl(),
        humidity: new FormControl(),
        other: new FormControl()
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

  public searchSpecie(): (id: string) => Observable<SearchResult> {
    const genusId = this.form.get('genusId')?.value;

    return term => (genusId ? this.specieService.searchWithGenus(term, genusId) : this.specieService.search(term))
      .pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === term),
        result
      })));
  }

  public search<I, T extends IdHolder<I> & { name: string }>(type: { search(term: string): Observable<T[]> }): (id: string) => Observable<SearchResult> {
    return term => type.search(term)
      .pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === term),
        result
      })));
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
}
