import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { RoleManagerRoutingModule } from './role-manager-routing.module';
import { DialogContentExampleDialog, DialogEdit, RoleManagerComponent } from './role-manager.component';


@NgModule({
  declarations: [RoleManagerComponent, DialogContentExampleDialog, DialogEdit],
  imports: [
    SharedModule,
    RoleManagerRoutingModule
  ]
})
export class RoleManagerModule { }
