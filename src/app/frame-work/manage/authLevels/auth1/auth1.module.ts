import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth1RoutingModule } from './auth1-routing.module';
import { Auth1Component } from './auth1.component';


@NgModule({
  declarations: [Auth1Component],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    Auth1RoutingModule
  ]
})
export class Auth1Module { }
