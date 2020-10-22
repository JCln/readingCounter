import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../shared/shared.module';
import { RoleManagerRoutingModule } from './role-manager-routing.module';
import { DialogContentExampleDialog, DialogEdit, RoleManagerComponent } from './role-manager.component';
import { AddNewComponent } from './add-new/add-new.component';


@NgModule({
  declarations: [RoleManagerComponent, DialogContentExampleDialog, DialogEdit, AddNewComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RoleManagerRoutingModule
  ]
})
export class RoleManagerModule { }
