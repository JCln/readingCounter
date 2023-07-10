import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { SelectActionComponent } from './select-action/select-action.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { UserEditRoutingModule } from './user-edit-routing.module';
import { UserEditComponent } from './user-edit.component';
import { UserInputsComponent } from './user-inputs/user-inputs.component';


@NgModule({
  declarations: [UserEditComponent, SelectZoneComponent, UserInputsComponent, SelectActionComponent],
  imports: [
    SharedModule,
    UserEditRoutingModule
  ]
})
export class UserEditModule { }
