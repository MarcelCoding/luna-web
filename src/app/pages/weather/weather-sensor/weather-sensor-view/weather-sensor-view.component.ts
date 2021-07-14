import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor, WeatherService } from '../../../../core/data/weather';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-sensor-view',
  templateUrl: './weather-sensor-view.component.html',
  styleUrls: ['./weather-sensor-view.component.scss']
})
export class WeatherSensorViewComponent {

  public readonly sensor: Observable<Sensor | undefined>;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly route: ActivatedRoute
  ) {
    this.sensor = this.route.params.pipe(
      filter(params => params.id),
      mergeMap(params => this.weatherService.getSensor(params.id))
    );
  }
}
