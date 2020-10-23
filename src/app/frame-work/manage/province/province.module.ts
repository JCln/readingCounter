import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddNewComponent } from '../../role-manager/add-new/add-new.component';
import { DeleteDialogComponent } from '../../role-manager/delete-dialog/delete-dialog.component';
import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';


@NgModule({
  declarations: [ProvinceComponent, AddNewComponent, DeleteDialogComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ProvinceRoutingModule
  ]
})
export class ProvinceModule { }
