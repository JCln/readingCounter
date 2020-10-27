import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { AuthLevelsRoutingModule } from './auth-levels-routing.module';
import { AuthLevelsComponent } from './auth-levels.component';


@NgModule({
  declarations: [AuthLevelsComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AuthLevelsRoutingModule
  ]
})
export class AuthLevelsModule { }
