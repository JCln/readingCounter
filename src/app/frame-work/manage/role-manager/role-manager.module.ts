import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { RoleManagerRoutingModule } from './role-manager-routing.module';
import { RoleManagerComponent } from './role-manager.component';


@NgModule({
  declarations: [RoleManagerComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RoleManagerRoutingModule
  ]
})
export class RoleManagerModule { }
