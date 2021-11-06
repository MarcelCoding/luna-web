import { Component, OnDestroy } from '@angular/core';
import { EMPTY, Observable, Subscription, throwError } from 'rxjs';
import { Sensor, SensorGroup, SensorWithoutId, WeatherService } from '../../../../core/data/weather';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, map, mergeMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { IdHolder } from '../../../../core/data';

@Component({
  selector: 'app-weather-sensor-edit',
  templateUrl: './weather-sensor-edit.component.html',
  styleUrls: ['./weather-sensor-edit.component.scss']
})
export class WeatherSensorEditComponent implements OnDestroy {

  public readonly form = this.fb.group({
    name: [ '', Validators.required ],
    description: [ '', Validators.required ],
    unit: [ '', Validators.required ],
    illustration: [ '', Validators.required ],
    group: this.fb.group({
      id: [ '', Validators.required ],
      name: [ '', Validators.required ]
    })
  });

  public readonly searchedGroups: Observable<SensorGroup[]>;
  private readonly subscription: Subscription;
  private sensorId?: string;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {
    this.subscription = this.route.params.pipe(
      filter(params => params.id),
      mergeMap(params => this.weatherService.getSensor(params.id)),
      mergeMap(sensor => !sensor ? throwError(() => new Error('Unable to load sensor.')) : this.load(sensor))
    ).subscribe();

    this.searchedGroups = this.form.get('group.name')!.valueChanges
      .pipe(distinctUntilChanged(), mergeMap(value => this.searchSensorGroups(value)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public selectGroup(id: string): void {
    this.weatherService.getSensorGroup(id)
      .pipe(filter(group => Boolean(group)))
      .subscribe(group => this.form.get('group')?.setValue({ id: group!.id, name: group!.name }));
  }

  public trackBy(index: number, { id }: IdHolder): string {
    return id;
  }

  public load(sensor: Sensor): Observable<void> {
    if (!sensor) {
      this.form.reset();
    }

    return this.weatherService.getSensorGroup(sensor.groupId)
      .pipe(mergeMap(group => {
        if (!group) {
          return throwError(() => new Error(`Unable to find sensor group ${sensor.groupId}.`));
        }

        this.sensorId = sensor?.id;
        this.form.reset(sensor, { emitEvent: false });
        this.form.get('group')!.reset({ id: group.id, name: group.name }, { emitEvent: false });

        return EMPTY;
      }));
  }

  public save(): void {
    if (this.sensorId && !this.form.valid) {
      return;
    }

    const value = this.form.value;

    const sensor: SensorWithoutId = {
      name: value.name,
      description: value.description,
      unit: value.unit,
      illustration: value.illustration.toUpperCase(),
      groupId: value.group.id
    };

    this.weatherService.updateSensor(this.sensorId!, sensor)
      .pipe(mergeMap(sensor => this.load(sensor)))
      .subscribe();
  }

  private searchSensorGroups(value: string): Observable<SensorGroup[]> {
    value = value?.trim()?.toLowerCase() || '';
    return this.weatherService.searchSensorGroups(value)
      .pipe(map(groups => this.handleSearchResults('group', value, groups)));
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
}
