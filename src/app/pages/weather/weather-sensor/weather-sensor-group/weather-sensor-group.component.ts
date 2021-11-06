import { Component } from '@angular/core';
import { Sensor, WeatherService } from '../../../../core/data/weather';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IdHolder } from '../../../../core/data';

@Component({
  selector: 'app-weather-sensor-group',
  templateUrl: './weather-sensor-group.component.html',
  styleUrls: ['./weather-sensor-group.component.scss']
})
export class WeatherSensorGroupComponent {

  public readonly sensors: Observable<Sensor[]>;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly route: ActivatedRoute
  ) {
    this.sensors = this.route.params.pipe(
      filter(params => params.id),
      mergeMap(params => this.weatherService.getSensors(params.id))
    );
  }

  public getSensorEditLink(sensor: Sensor): string {
    return `../../${sensor.id}/edit`;
  }

  public trackBy(index: number, { id }: IdHolder): string {
    return id;
  }
}
