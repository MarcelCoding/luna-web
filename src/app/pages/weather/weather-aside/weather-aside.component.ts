import { Component } from '@angular/core';
import { SensorGroup, WeatherService } from '../../../core/data/weather';
import { Observable } from 'rxjs';
import { IdHolder } from '../../../core/data';

@Component({
  selector: 'app-weather-aside',
  templateUrl: './weather-aside.component.html',
  styleUrls: ['./weather-aside.component.scss']
})
export class WeatherAsideComponent {

  constructor(
    private readonly weatherService: WeatherService
  ) {
  }

  public get sensorGroups(): Observable<SensorGroup[]> {
    return this.weatherService.getSensorGroups();
  }

  public getSensorGroupLink(group: SensorGroup): string[] {
    return [ 'sensor', 'group', group.id ];
  }

  public trackBy(index: number, { id }: IdHolder): string {
    return id;
  }
}
