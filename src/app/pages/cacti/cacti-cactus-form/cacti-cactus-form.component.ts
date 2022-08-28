import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IdHolder} from "../../../../api/api.domain";
import {filter, map, mergeMap, Observable, switchMap, tap} from "rxjs";
import {CactiCareGroupService} from "../../../../api/cacti/cacti-care-group.service";
import {Entity, SearchResult} from "../../../../components/text-field/text-field.component";
import {CactiGenusService} from "../../../../api/cacti/cacti-genus.service";
import {CactiSpecieService} from "../../../../api/cacti/cacti-specie.service";
import {CactiFormService} from "../../../../api/cacti/cacti-form.service";
import {Cactus, CactusWithoutId, Form} from "../../../../api/cacti/cacti.domain";
import {formatISO, intervalToDuration} from "date-fns";
import {formatDuration, parseDuration} from "../../../../utils/time";
import {EndpointService} from "../../../../api/endpoint/endpoint.service";
import {CactiCactusService} from "../../../../api/cacti/cacti-cactus.service";

function isoTimestampToDate(iso: string | null): string | null {
  if (!iso) {
    return null;
  }

  return formatISO(new Date(iso), {representation: 'date'});
}

function parseAcquisitionAge(date: string | null, iso: string | null): string | null {
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

function calculateAge(born: string, died: string | null): string {
  const duration = intervalToDuration({
    start: new Date(born),
    end: died ? new Date(died) : new Date()
  });

  return formatDuration(duration);
}

function dateToIsoTimestamp(date: string | null): string | null {
  if (!date) {
    return null;
  }

  return formatISO(new Date(date));
}

function calcAge(timestamp: string | null, value: string | null): string | null {
  if (!value) {
    return null;
  }

  const [years, months] = value.split('+').map(value => parseInt(value));

  const start = timestamp ? new Date(timestamp) : new Date();
  start.setUTCFullYear(start.getUTCFullYear() - years);
  start.setUTCMonth(start.getUTCMonth() - months);

  const end = timestamp ? new Date(timestamp) : new Date();

  const deltaMs = end.getTime() - start.getTime();
  const deltaS = deltaMs / 1000;
  const deltaM = deltaS / 60;
  const deltaH = deltaM / 60;

  return `PT${deltaH}H`;
}

@Component({
  selector: 'app-cacti-cactus-form',
  templateUrl: './cacti-cactus-form.component.html',
  styleUrls: ['./cacti-cactus-form.component.scss']
})
export class CactiCactusFormComponent implements OnChanges {

  @Input() public cactus?: Cactus;

  protected readonly form = new FormGroup({
    number: new FormControl<string | null>(null, Validators.required),
    genusId: new FormControl<string | null>(null),
    specieId: new FormControl<string | null>(null),
    formId: new FormControl<string | null>(null),
    fieldNumber: new FormControl<string | null>(null),
    flowerColor: new FormControl<string | null>(null),
    synonymes: new FormControl<string | null>(null),

    state: new FormGroup({
      age: new FormControl<string | null>({value: '', disabled: true}),
      vitality: new FormControl<string | null>(null),
      noLongerInPossessionReason: new FormControl<string | null>(null),
      noLongerInPossessionTimestamp: new FormControl<string | null>(null)
    }),

    acquisition: new FormGroup({
      timestamp: new FormControl<string | null>(null),
      place: new FormControl<string | null>(null),
      age: new FormControl<string | null>(null, Validators.pattern(/\d+\s*\+\s*\d+/)),
      plantType: new FormControl<string | null>(null),
    }),

    careGroup: new FormGroup({
      id: new FormControl<string | null>(null),
      home: new FormControl<string | null>(null),
      soil: new FormControl<string | null>(null),

      growTime: new FormGroup({
        light: new FormControl<string | null>(null),
        air: new FormControl<string | null>(null),
        temperature: new FormControl<string | null>(null),
        humidity: new FormControl<string | null>(null),
        other: new FormControl<string | null>(null)
      }),

      restTime: new FormGroup({
        light: new FormControl<string | null>(null),
        air: new FormControl<string | null>(null),
        temperature: new FormControl<string | null>(null),
        humidity: new FormControl<string | null>(null),
        other: new FormControl<string | null>(null)
      })
    })
  });

  constructor(
    private readonly endpointService: EndpointService,
    protected readonly genusService: CactiGenusService,
    protected readonly specieService: CactiSpecieService,
    protected readonly formService: CactiFormService,
    protected readonly careGroupService: CactiCareGroupService,
    private readonly cactusService: CactiCactusService
  ) {
  }

  protected get base(): string {
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
                ? {age: calculateAge(cactus.acquisition.born, cactus.state?.noLongerInPossessionTimestamp ?? null)}
                : {age: null}
            )
          },

          acquisition: cactus.acquisition ? {
            timestamp: isoTimestampToDate(cactus.acquisition.timestamp),
            place: cactus.acquisition.place,
            age: parseAcquisitionAge(cactus.acquisition.timestamp, cactus.acquisition.age),
            plantType: cactus.acquisition.plantType
          } : {timestamp: null, place: null, age: null, plantType: null},

          careGroup: cactus.careGroup ? {
            id: cactus.careGroup.id,
            home: cactus.careGroup.home,
            soil: cactus.careGroup.soil,

            growTime: cactus.careGroup.growTime
              ? {
                light: cactus.careGroup.growTime.light,
                air: cactus.careGroup.growTime.air,
                temperature: cactus.careGroup.growTime.temperature,
                humidity: cactus.careGroup.growTime.humidity,
                other: cactus.careGroup.growTime.other
              }
              : {light: null, air: null, temperature: null, humidity: null, other: null},

            restTime: cactus.careGroup.restTime
              ? {
                light: cactus.careGroup.restTime.light,
                air: cactus.careGroup.restTime.air,
                temperature: cactus.careGroup.restTime.temperature,
                humidity: cactus.careGroup.restTime.humidity,
                other: cactus.careGroup.restTime.other
              } : {light: null, air: null, temperature: null, humidity: null, other: null},
          } : {
            id: null,
            growTime: {light: null, air: null, temperature: null, humidity: null, other: null},
            restTime: {light: null, air: null, temperature: null, humidity: null, other: null},
            home: null,
            soil: null
          }
        };

        this.form.reset(value);
      }
    }
  }

  public getValue(): CactusWithoutId | null {
    if (!this.form.valid) {
      return null;
    }

    const changes = this.form.value;

    return {
      number: changes.number!,

      genusId: changes.genusId ?? null,
      specieId: changes.specieId ?? null,
      formId: changes.formId ?? null,

      fieldNumber: changes.fieldNumber ?? null,
      flowerColor: changes.flowerColor ?? null,
      images: [],
      synonymes: changes.synonymes ?? null,
      age: null,

      state: {
        noLongerInPossessionTimestamp: dateToIsoTimestamp(changes.state?.noLongerInPossessionTimestamp ?? null),
        noLongerInPossessionReason: changes.state?.noLongerInPossessionReason ?? null,
        vitality: changes.state?.vitality ?? null
      },

      acquisition: {
        timestamp: dateToIsoTimestamp(changes.acquisition?.timestamp ?? null),
        age: calcAge(changes.acquisition?.timestamp ?? null, changes.acquisition?.age ?? null),
        plantType: changes.acquisition?.plantType ?? null,
        place: changes.acquisition?.place ?? null,
        born: null,
      },

      careGroup: {
        id: changes.careGroup?.id ?? null,
        name: null,

        home: changes.careGroup?.home ?? null,
        soil: changes.careGroup?.soil ?? null,

        growTime: {
          light: changes.careGroup?.growTime?.light ?? null,
          air: changes.careGroup?.growTime?.air ?? null,
          temperature: changes.careGroup?.growTime?.temperature ?? null,
          humidity: changes.careGroup?.growTime?.humidity ?? null,
          other: changes.careGroup?.growTime?.other ?? null,
        },

        restTime: {
          light: changes.careGroup?.restTime?.light ?? null,
          air: changes.careGroup?.restTime?.air ?? null,
          temperature: changes.careGroup?.restTime?.temperature ?? null,
          humidity: changes.careGroup?.restTime?.humidity ?? null,
          other: changes.careGroup?.restTime?.other ?? null,
        }
      }
    };
  }

  public isDirty(): boolean {
    return this.form.dirty;
  }

  protected get<T>(type: { get(id: string): Observable<T> }): (id: string) => Observable<T> {
    return id => type.get(id);
  }

  protected search<I, T extends IdHolder<I> & { name: string }>(type: { search(term: string): Observable<T[]> }): (id: string) => Observable<SearchResult> {
    return term => type.search(term)
      .pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === term.toLowerCase()),
        result
      })));
  }

  protected searchSpecie(): (id: string) => Observable<SearchResult> {
    const genusId = this.form.get('genusId')?.value;

    return term => (genusId ? this.specieService.searchWithGenus(term, genusId) : this.specieService.search(term))
      .pipe(map(result => ({
        exact: result.find(d => d.name.toLowerCase().trim() === term.toLowerCase()),
        result
      })));
  }

  protected searchForms(): (id: string) => Observable<SearchResult> {
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

  protected applyGenus({id}: Entity): void {
    this.genusService.get(id)
      .pipe(
        map(() => this.form.controls.specieId.value),
        filter(specieId => !!specieId),
        switchMap(specieId => this.specieService.get(specieId!)), // can not be null because of filter
        filter(specie => specie.genusId !== id)
      )
      .subscribe(() => this.form.patchValue({specieId: null, formId: null}));
  }

  protected applySpecie({id}: Entity): void {
    this.specieService.get(id)
      .pipe(
        tap(specie => this.form.controls.genusId.setValue(specie.genusId)),
        map(() => this.form.controls.formId.value),
        filter(formId => !!formId),
        switchMap(formId => this.formService.get(formId!)), // can not be null because of filter
        filter(form => form.specieId !== id)
      )
      .subscribe(() => this.form.controls.specieId.setValue(null));
  }

  protected applyForm({id}: Entity): void {
    this.formService.get(id)
      .pipe(
        tap(form => this.form.controls.specieId.setValue(form.specieId)),
        mergeMap(form => this.specieService.get(form.specieId))
      )
      .subscribe(specie => this.form.get("genusId")?.setValue(specie.genusId));
  }

  protected applyCareGroup({id}: Entity): void {
    this.careGroupService.get(id)
      .subscribe(careGroup => this.form.controls.careGroup.setValue({
        id: careGroup.id,
        home: careGroup.home,
        soil: careGroup.soil,

        growTime: careGroup.growTime
          ? {
            light: careGroup.growTime.light,
            air: careGroup.growTime.air,
            temperature: careGroup.growTime.temperature,
            humidity: careGroup.growTime.humidity,
            other: careGroup.growTime.other,
          }
          : {light: null, air: null, temperature: null, humidity: null, other: null},

        restTime: careGroup.restTime ? {
            light: careGroup.restTime.light,
            air: careGroup.restTime.air,
            temperature: careGroup.restTime.temperature,
            humidity: careGroup.restTime.humidity,
            other: careGroup.restTime.other
          }
          : {light: null, air: null, temperature: null, humidity: null, other: null},
      }));
  }

  protected trackBy<T>(index: number, {id}: IdHolder<T>): T {
    return id;
  }

  protected upload(images: FileList): void {
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

  // arrow function for correct scope
  protected createGenus = (name: string): Observable<Entity> => {
    return this.genusService.add({name});
  };

  // arrow function for correct scope
  protected createSpecie = (name: string): Observable<Entity> => {
    const genusId = this.form.controls.genusId.value;

    if (!genusId) {
      throw new Error("TODO: create specie only if genusId is set");
    }

    return this.specieService.add({name, genusId});
  };

  // arrow function for correct scope
  protected createForm = (name: string): Observable<Entity> => {
    const specieId = this.form.controls.specieId.value;

    if (!specieId) {
      throw new Error("TODO: create form only if specieId is set");
    }

    return this.formService.add({name, specieId});
  };
}
