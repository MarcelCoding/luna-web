import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndpointsComponent } from './endpoints/endpoints.component';

const routes: Routes = [
  { path: 'endpoints', component: EndpointsComponent },
  { path: '', redirectTo: 'endpoints', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {
}
