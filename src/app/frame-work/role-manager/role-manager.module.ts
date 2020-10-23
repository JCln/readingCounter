import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../shared/shared.module';
import { RoleManagerRoutingModule } from './role-manager-routing.module';
import { DialogContentExampleDialog, DialogEdit, RoleManagerComponent } from './role-manager.component';
import { AddNewComponent } from './add-new/add-new.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [RoleManagerComponent, DialogContentExampleDialog, DialogEdit, AddNewComponent, DeleteDialogComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RoleManagerRoutingModule
  ]
})
export class RoleManagerModule { }
