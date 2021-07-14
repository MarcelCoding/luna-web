import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    children: [
      {
        path: 'sensor',
        loadChildren: () => import('./weather-sensor/weather-sensor.module').then(m => m.WeatherSensorModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule {
}
