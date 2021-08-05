import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherSensorRoutingModule } from './weather-sensor-routing.module';
import { WeatherSensorComponent } from './weather-sensor/weather-sensor.component';
import { WeatherSensorGroupComponent } from './weather-sensor-group/weather-sensor-group.component';
import { WeatherSensorViewComponent } from './weather-sensor-view/weather-sensor-view.component';
import { WeatherSensorEditComponent } from './weather-sensor-edit/weather-sensor-edit.component';
import { WeatherSensorGroupEditComponent } from './weather-sensor-group-edit/weather-sensor-group-edit.component';
import { ComponentsModule } from '../../../core/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from '../../../core/components/chart/chart.module';
import { WeatherTimeSelectorComponent } from './weather-time-selector/weather-time-selector.component';

@NgModule({
  declarations: [
    WeatherSensorComponent,
    WeatherSensorGroupComponent,
    WeatherSensorViewComponent,
    WeatherSensorEditComponent,
    WeatherSensorGroupEditComponent,
    WeatherTimeSelectorComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    WeatherSensorRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    ChartModule
  ]
})
export class WeatherSensorModule {
}
