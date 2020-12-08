import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ManageRoutingModule } from './manage-routing.module';


@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    SharedModule,
    ManageRoutingModule
  ]
})
export class ManageModule { }
