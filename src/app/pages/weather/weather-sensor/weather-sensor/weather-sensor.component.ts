import { Component, Input, OnInit } from '@angular/core';
import { Sensor, WeatherService } from '../../../../core/data/weather';
import { EMPTY, Observable, of } from 'rxjs';
import { Series } from '../../../../core/components/chart/chart.domain';
import { distinctUntilChanged, map, take, tap } from 'rxjs/operators';
import { DateTime } from 'luxon/src/luxon';

@Component({
  selector: 'app-weather-sensor',
  templateUrl: './weather-sensor.component.html',
  styleUrls: ['./weather-sensor.component.scss']
})
export class WeatherSensorComponent implements OnInit {

  @Input()
  public sensor: Sensor | undefined | null;

  @Input()
  public edit?: string | string[];

  public series?: Series[];

  constructor(
    private readonly weatherService: WeatherService
  ) {
  }

  ngOnInit() {
    setTimeout(() => this.loadSeries, 1000);
  }

  public get loadSeries(): void {
    if (!this.sensor) {
      return;
    }

    const sensor = this.sensor;

    this.weatherService.getSensorData(
      sensor.id, 'HOURLY',
      new Date(2021, 6, 18, 6),
      new Date(2021, 6, 18, 15)
    )
      .subscribe(series => {
        this.series = [{
          name: sensor.name,
          color: '000',
          data: series?.map(entry => ({ x: Date.parse(entry.timestamp), y: entry.value })) || []
        }];
      });
  }
}
