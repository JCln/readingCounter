import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth1AddDgComponent } from './auth1-add-dg/auth1-add-dg.component';
import { Auth1EditDgComponent } from './auth1-edit-dg/auth1-edit-dg.component';
import { Auth1RoutingModule } from './auth1-routing.module';
import { Auth1Component } from './auth1.component';

@NgModule({
  declarations: [Auth1Component, Auth1AddDgComponent, Auth1EditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    Auth1RoutingModule
  ]
})
export class Auth1Module { }
