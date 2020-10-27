import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth4RoutingModule } from './auth4-routing.module';
import { Auth4Component } from './auth4.component';


@NgModule({
  declarations: [Auth4Component],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    Auth4RoutingModule
  ]
})
export class Auth4Module { }
