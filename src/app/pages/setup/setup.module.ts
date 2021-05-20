import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { EndpointsComponent } from './endpoints/endpoints.component';
import { EndpointComponent } from './endpoints/endpoint/endpoint.component';
import { ComponentsModule } from '../../core/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EndpointsComponent,
    EndpointComponent
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class SetupModule {
}
