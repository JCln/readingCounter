import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth4RoutingModule } from './auth4-routing.module';
import { Auth4Component } from './auth4.component';
import { Auth4AddDgComponent } from './auth4-add-dg/auth4-add-dg.component';
import { Auth4EditDgComponent } from './auth4-edit-dg/auth4-edit-dg.component';


@NgModule({
  declarations: [Auth4Component, Auth4AddDgComponent, Auth4EditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    Auth4RoutingModule
  ]
})
export class Auth4Module { }
