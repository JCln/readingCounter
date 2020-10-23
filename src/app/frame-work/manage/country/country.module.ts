import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddNewComponent } from '../../role-manager/add-new/add-new.component';
import { DeleteDialogComponent } from '../../role-manager/delete-dialog/delete-dialog.component';
import { SharedModule } from './../../../shared/shared.module';
import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';


@NgModule({
  declarations: [CountryComponent, AddNewComponent, DeleteDialogComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CountryRoutingModule
  ]
})
export class CountryModule { }
