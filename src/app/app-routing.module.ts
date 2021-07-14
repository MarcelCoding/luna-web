import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupGuard } from './pages/setup/setup.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate: [SetupGuard] },
  {
    path: 'cacti',
    loadChildren: () => import('./pages/cacti/cacti.module').then(m => m.CactiModule),
    canActivate: [SetupGuard]
  },
  {
    path: 'weather',
    loadChildren: () => import('./pages/weather/weather.module').then(m => m.WeatherModule),
    canActivate: [SetupGuard]
  },
  { path: 'setup', loadChildren: () => import('./pages/setup/setup.module').then(m => m.SetupModule) },
  { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
