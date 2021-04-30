import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { SelectActionComponent } from './select-action/select-action.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { UserEditRoutingModule } from './user-edit-routing.module';
import { UserEditComponent } from './user-edit.component';
import { UserInputsComponent } from './user-inputs/user-inputs.component';


@NgModule({
  declarations: [UserEditComponent, SelectZoneComponent, UserInputsComponent, SelectActionComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    UserEditRoutingModule
  ]
})
export class UserEditModule { }
