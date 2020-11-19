import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth2RoutingModule } from './auth2-routing.module';
import { Auth2Component } from './auth2.component';
import { Auth2AddDgComponent } from './auth2-add-dg/auth2-add-dg.component';
import { Auth2EditDgComponent } from './auth2-edit-dg/auth2-edit-dg.component';


@NgModule({
  declarations: [Auth2Component, Auth2AddDgComponent, Auth2EditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    Auth2RoutingModule
  ]
})
export class Auth2Module { }
