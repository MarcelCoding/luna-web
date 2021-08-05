import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateTime } from 'luxon/src/luxon';

export interface TimeRange {
  from: DateTime;
  to?: DateTime;
}

@Component({
  selector: 'app-weather-time-selector',
  templateUrl: './weather-time-selector.component.html',
  styleUrls: ['./weather-time-selector.component.scss']
})
export class WeatherTimeSelectorComponent implements OnInit, OnDestroy {

  @Output()
  private timeRange = new EventEmitter<TimeRange>();

  public range = new FormControl();
  public custom = false;

  private subscription?: Subscription;

  ngOnInit(): void {
    this.range.valueChanges.subscribe(hours => {
      this.timeRange.emit({ from: DateTime.now().minus({ hours }) });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
