import { Component, Input, OnInit } from '@angular/core';
import { Sensor, WeatherService } from '../../../../core/data/weather';
import { Series } from '../../../../core/components/chart/chart.domain';
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
  public edit?: string;

  public series?: Series[];

  public from?: number;
  public to?: number;

  constructor(
    private readonly weatherService: WeatherService
  ) {
  }

  ngOnInit() {
    setTimeout(() => this.loadSeries(DateTime.now()), 1000);
  }

  public loadSeries(from: DateTime, to?: DateTime): void {
    if (!this.sensor) {
      return;
    }

    const sensor = this.sensor;

    this.weatherService.getSensorData(sensor.id, 'HOURLY', from, to)
      .subscribe(series => {
        this.from = from.toMillis();
        this.to = to?.toMillis() || Date.now();

        this.series = [{
          name: sensor.name,
          color: '000',
          data: series?.map(entry => ({ x: Date.parse(entry.timestamp), y: entry.value })) || []
        }];
      });
  }
}
