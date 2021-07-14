import { Injectable } from '@angular/core';
import { Resolution, Sensor, SensorData, SensorGroup, SensorWithoutId } from './weather.domain';
import { WeatherApiService } from './weather-api.service';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DateTime } from 'luxon/src/luxon';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private sensors0?: Sensor[];
  private sensorGroups0?: SensorGroup[];

  private updating?: Subject<void>;

  constructor(
    private readonly weatherApiService: WeatherApiService
  ) {
  }

  private get sensors(): Observable<Sensor[]> {
    if (!this.updating && !this.sensors0) {
      this.update();
    }

    return (
      !this.sensors0
        ? this.updating!.pipe(map(_ => this.sensors0!))
        : of(this.sensors0)
    )
      .pipe(take(1));
  }

  private get sensorGroups(): Observable<SensorGroup[]> {
    if (!this.updating && !this.sensorGroups0) {
      this.update();
    }

    return (
      !this.sensorGroups0
        ? this.updating!.pipe(map(_ => this.sensorGroups0!))
        : of(this.sensorGroups0)
    )
      .pipe(take(1));
  }

  /* --- get methods ---  */

  public getSensor(id: string): Observable<Sensor | undefined> {
    return this.sensors.pipe(map(sensors => sensors.find(sensor => sensor.id === id)));
  }

  public getSensors(groupId: string): Observable<Sensor[]> {
    return this.sensors.pipe(map(sensors => sensors.filter(sensor => sensor.groupId === groupId)));
  }

  public getSensorData(id: string, resolution: Resolution, from: Date, to?: Date): Observable<SensorData[]> {
    return this.weatherApiService.getSensorData(id, resolution, from, to).pipe(take(1));
  }

  public getSensorGroup(id: string): Observable<SensorGroup | undefined> {
    return this.sensorGroups.pipe(map(groups => groups.find(group => group.id === id)));
  }

  public getSensorGroups(): Observable<SensorGroup[]> {
    return this.sensorGroups;
  }

  /* --- search methods ---  */

  public searchSensorGroups(token: string): Observable<SensorGroup[]> {
    if (!token.length) {
      return this.sensorGroups;
    }

    return this.sensorGroups.pipe(map(groups => groups.filter(group => group.name.toLowerCase().includes(token))));
  }

  /* --- add methods ---  */

  /* --- update methods ---  */

  public updateSensor(id: string, sensor: SensorWithoutId): Observable<Sensor> {
    return forkJoin({
      local: this.getSensor(id),
      updated: this.weatherApiService.updateSensor(id, sensor)
    })
      .pipe(
        map(({ local, updated }) => {
          if (!local) {
            this.sensors0?.push(updated);
            return updated;
          }

          local.name = updated.name;
          local.description = updated.description;
          local.unit = updated.unit;
          local.illustration = updated.illustration;
          local.groupId = updated.groupId;
          return local;
        }),
        take(1)
      );
  }

  /* --- internal methods ---  */

  private update(): void {
    this.updating = new Subject();

    forkJoin({
      sensors: this.weatherApiService.getSensors(),
      sensorGroups: this.weatherApiService.getSensorGroups()
    })
      .pipe(take(1))
      .subscribe(({ sensors, sensorGroups }) => {
        this.sensors0 = sensors;
        this.sensorGroups0 = sensorGroups;
        this.updating!.next();
        console.log(`Updated weather cache: ${sensors.length} sensors, ${sensorGroups.length} sensor groups`);
      }, error => {
        this.updating!.error(error);
        console.error('Unable to update weather cache.', error);
      }, () => {
        this.updating!.complete();
        delete this.updating;
      });
  }
}
