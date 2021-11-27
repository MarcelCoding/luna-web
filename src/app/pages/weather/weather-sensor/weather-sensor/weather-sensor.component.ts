import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Sensor, TimeRange, WeatherService } from '../../../../core/data/weather';
import { Series } from '../../../../core/components/chart/chart.domain';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-sensor',
  templateUrl: './weather-sensor.component.html',
  styleUrls: ['./weather-sensor.component.scss']
})
export class WeatherSensorComponent implements OnInit, OnDestroy {

  @Input()
  public sensor?: Sensor | null;

  @Input()
  public editLink?: string;

  public series?: Series[];

  public from?: number;
  public to?: number;

  private subscription?: Subscription;

  constructor(
    private readonly weatherService: WeatherService
  ) {
  }

  ngOnInit() {
    this.subscription = this.weatherService.timeRangeUpdates.subscribe(range => this.loadSeries(range));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private loadSeries(range: TimeRange): void {
    if (!this.sensor) {
      return;
    }

    const sensor = this.sensor;

    this.weatherService.getSensorData(sensor.id, range)
      .pipe(delay(500))
      .subscribe(series => {
        this.from = range.from.toMillis();
        this.to = range.to?.toMillis() || Date.now();

        this.series = [{
          name: sensor.name,
          color: '000',
          data: series?.map(entry => ({ x: Date.parse(entry.timestamp), y: entry.value })) || []
        }];
      });
  }
}
