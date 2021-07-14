import { Injectable } from '@angular/core';
import { EndpointService } from '../endpoints/endpoint.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolution, Sensor, SensorData, SensorGroup, SensorGroupWithoutId, SensorWithoutId } from './weather.domain';
import { DateTime } from 'luxon/src/luxon';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(
    private readonly endpointService: EndpointService,
    private readonly httpClient: HttpClient,
    private readonly apiService: ApiService
  ) {
  }

  private get apiSensor(): string {
    return `${this.endpointService.selected}/weather/sensor`;
  }

  private get apiSensorGroup(): string {
    return `${this.endpointService.selected}/weather/sensor/group`;
  }

  /* --- get methods ---  */

  public getSensors(): Observable<Sensor[]> {
    return this.httpClient.get<Sensor[]>(this.apiSensor)
      .pipe(catchError(this.apiService.handleError('getSensors')));
  }

  public getSensorData(id: string, resolution: Resolution, from: Date, to?: Date): Observable<SensorData[]> {
    const params = new URLSearchParams();

    params.set('resolution', resolution);
    params.set('from', from.toISOString());
    if (to) {
      params.set('to', to.toISOString());
    }

    return this.httpClient.get<SensorData[]>(`${this.apiSensor}/${id}/data?${params.toString()}`)
      .pipe(catchError(this.apiService.handleError('getSensorData')));
  }

  public getSensorGroups(): Observable<SensorGroup[]> {
    return this.httpClient.get<SensorGroup[]>(this.apiSensorGroup)
      .pipe(catchError(this.apiService.handleError('getSensorGroups')));
  }

  /* --- add methods ---  */

  public addSensor(sensor: SensorWithoutId): Observable<Sensor> {
    return this.httpClient.post<Sensor>(this.apiSensor, sensor)
      .pipe(catchError(this.apiService.handleError('addSensor')));
  }

  public addSensorGroup(sensorGroup: SensorGroupWithoutId): Observable<SensorGroup> {
    return this.httpClient.post<SensorGroup>(this.apiSensorGroup, sensorGroup)
      .pipe(catchError(this.apiService.handleError('addSensorGroup')));
  }

  /* --- update methods ---  */

  public updateSensor(id: string, Sensor: SensorWithoutId): Observable<Sensor> {
    return this.httpClient.put<Sensor>(`${this.apiSensor}/${id}`, Sensor)
      .pipe(catchError(this.apiService.handleError('updateSensor')));
  }

  public updateSensorGroup(id: string, SensorGroup: SensorGroupWithoutId): Observable<SensorGroup> {
    return this.httpClient.put<SensorGroup>(`${this.apiSensorGroup}/${id}`, SensorGroup)
      .pipe(catchError(this.apiService.handleError('updateSensorGroup')));
  }
}
