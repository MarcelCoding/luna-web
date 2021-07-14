import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherSensorViewComponent } from './weather-sensor-view/weather-sensor-view.component';
import { WeatherSensorGroupComponent } from './weather-sensor-group/weather-sensor-group.component';
import { WeatherSensorEditComponent } from './weather-sensor-edit/weather-sensor-edit.component';
import { WeatherSensorGroupEditComponent } from './weather-sensor-group-edit/weather-sensor-group-edit.component';

const routes: Routes = [
  { path: ':id', component: WeatherSensorViewComponent },
  { path: ':id/edit', component: WeatherSensorEditComponent },
  {
    path: 'group/:id', component: WeatherSensorGroupComponent,
    children: [
      { path: 'edit', component: WeatherSensorGroupEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherSensorRoutingModule {
}
