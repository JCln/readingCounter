import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth3RoutingModule } from './auth3-routing.module';
import { Auth3Component } from './auth3.component';


@NgModule({
  declarations: [Auth3Component],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    Auth3RoutingModule
  ]
})
export class Auth3Module { }
