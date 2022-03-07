import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IdHolder} from "../../../../api/api.domain";
import {map, Observable} from "rxjs";
import {CactiCareGroupService} from "../../../../api/cacti/cacti-care-group.service";
import {SearchResult} from "../../../../components/text-field/text-field.component";
import {CactiGenusService} from "../../../../api/cacti/cacti-genus.service";
import {CactiSpecieService} from "../../../../api/cacti/cacti-specie.service";
import {CactiFormService} from "../../../../api/cacti/cacti-form.service";
import {Cactus} from "../../../../api/cacti/cacti.domain";
import {formatDuration, parseDuration} from "../../../../utils/time";
import {formatISO, parseISO} from "date-fns";

function isoTimestampToDate(iso: string): string {
  const date = parseISO(iso);
  return formatISO(date, {representation: 'date'});
}

function parseAcquisitionAge(iso: string): string {
  const {years, months} = parseDuration(iso);
  return `${years} + ${months}`;
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
      age: new FormControl({value: null, disabled: true}),
      vitality: new FormControl(),
      noLongerInPossessionReason: new FormControl(),
      noLongerInPossessionTimestamp: new FormControl()
    }),

    acquisition: new FormGroup({
      timestamp: new FormControl(),
      place: new FormControl(),
      age: new FormControl(),
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
    public readonly genusService: CactiGenusService,
    public readonly specieService: CactiSpecieService,
    public readonly formService: CactiFormService,
    public readonly careGroupService: CactiCareGroupService
  ) {
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
            age: cactus.age ? formatDuration(cactus.age) : null,
            vitality: cactus.state ? cactus.state.vitality : null,
            noLongerInPossessionReason: cactus.state ? cactus.state.noLongerInPossessionReason : null,
            noLongerInPossessionTimestamp: cactus.state?.noLongerInPossessionTimestamp ? isoTimestampToDate(cactus.state.noLongerInPossessionTimestamp) : null
          },

          acquisition: cactus.acquisition ? {
            timestamp: cactus.acquisition.timestamp ? isoTimestampToDate(cactus.acquisition.timestamp) : null,
            place: cactus.acquisition.place,
            age: cactus.acquisition.age ? parseAcquisitionAge(cactus.acquisition.age) : null,
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

  public search<I, T extends IdHolder<I>>(type: { search(term: string): Observable<T[]> }): (id: string) => Observable<SearchResult> {
    // @ts-ignore
    return term => type.search(term)
      .pipe(map(result => ({
        // @ts-ignore
        exact: result.find(d => d.name.toLowerCase().trim() === term),
        result
      })));
  }

  public trackBy<T>(index: number, {id}: IdHolder<T>): T {
    return id;
  }
}
