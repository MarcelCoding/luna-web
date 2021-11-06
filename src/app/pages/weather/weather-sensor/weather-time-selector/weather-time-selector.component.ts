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

  public range = new FormControl();
  public custom = false;
  @Output()
  private timeRange = new EventEmitter<TimeRange>();
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
