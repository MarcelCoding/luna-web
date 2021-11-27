import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { WeatherAsideComponent } from './weather-aside/weather-aside.component';
import { WeatherTimeSelectorComponent } from './weather-time-selector/weather-time-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../core/components/components.module';

@NgModule({
  declarations: [
    WeatherComponent,
    WeatherAsideComponent,
    WeatherTimeSelectorComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class WeatherModule {
}
