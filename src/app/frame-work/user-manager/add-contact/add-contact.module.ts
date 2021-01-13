import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddContactRoutingModule } from './add-contact-routing.module';
import { AddContactComponent } from './add-contact.component';
import { UserInputsComponent } from './user-inputs/user-inputs.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { SelectActionComponent } from './select-action/select-action.component';
import { SelectRolesComponent } from './select-roles/select-roles.component';


@NgModule({
  declarations: [AddContactComponent, UserInputsComponent, SelectZoneComponent, SelectActionComponent, SelectRolesComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AddContactRoutingModule
  ]
})
export class AddContactModule { }
