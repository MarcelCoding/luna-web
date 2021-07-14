import { Component, Input } from '@angular/core';
import { Series } from './chart.domain';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  private static readonly EMPTY_SERIES = [];

  @Input()
  series?: Series[];

  get series0(): Series[] {
    return this.series || ChartComponent.EMPTY_SERIES;
  }
}
