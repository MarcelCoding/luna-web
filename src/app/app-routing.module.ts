import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  {path: 'home', pathMatch: 'full', redirectTo: ''},
  {path: 'cacti', loadChildren: () => import('./pages/cacti/cacti.module').then(m => m.CactiModule)},
  {path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
