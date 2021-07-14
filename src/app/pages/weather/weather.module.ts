import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { WeatherAsideComponent } from './weather-aside/weather-aside.component';

@NgModule({
  declarations: [
    WeatherComponent,
    WeatherAsideComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule {
}
