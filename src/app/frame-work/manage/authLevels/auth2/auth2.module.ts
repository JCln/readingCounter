import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { Auth2RoutingModule } from './auth2-routing.module';
import { Auth2Component } from './auth2.component';


@NgModule({
  declarations: [Auth2Component],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    Auth2RoutingModule
  ]
})
export class Auth2Module { }
