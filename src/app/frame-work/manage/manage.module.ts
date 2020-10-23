import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { AddNewComponent } from './add-new/add-new.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ManageRoutingModule } from './manage-routing.module';


@NgModule({
  declarations: [AddNewComponent, DeleteDialogComponent],
  imports: [
    SharedModule,
    ManageRoutingModule
  ]
})
export class ManageModule { }
