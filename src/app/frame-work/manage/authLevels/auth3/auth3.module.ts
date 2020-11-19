import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth3RoutingModule } from './auth3-routing.module';
import { Auth3Component } from './auth3.component';
import { Auth3EditDgComponent } from './auth3-edit-dg/auth3-edit-dg.component';
import { Auth3AddDgComponent } from './auth3-add-dg/auth3-add-dg.component';


@NgModule({
  declarations: [Auth3Component, Auth3EditDgComponent, Auth3AddDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    Auth3RoutingModule
  ]
})
export class Auth3Module { }
