import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { EditContactRoutingModule } from './edit-contact-routing.module';
import { EditContactComponent } from './edit-contact.component';
import { SelectActionComponent } from './select-action/select-action.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { UserInputsComponent } from './user-inputs/user-inputs.component';


@NgModule({
  declarations: [EditContactComponent, SelectZoneComponent, UserInputsComponent, SelectActionComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    EditContactRoutingModule
  ]
})
export class EditContactModule { }
