import { NgModule } from '@angular/core';
import { UserAddManagerService } from 'services/user-add-manager.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { SelectActionComponent } from './select-action/select-action.component';
import { SelectRolesComponent } from './select-roles/select-roles.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { UserAddRoutingModule } from './user-add-routing.module';
import { UserAddComponent } from './user-add.component';
import { UserInputsComponent } from './user-inputs/user-inputs.component';


@NgModule({
  declarations: [
    UserInputsComponent,
    UserAddComponent,
    SelectZoneComponent,
    SelectActionComponent,
    SelectRolesComponent
  ],
  imports: [
    SharedModule,
    UserAddRoutingModule
  ],
  providers: [UserAddManagerService]
})
export class UserAddModule { }
