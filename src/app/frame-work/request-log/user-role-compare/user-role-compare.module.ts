import { NgModule } from '@angular/core';

import { UserRoleCompareRoutingModule } from './user-role-compare-routing.module';
import { UserRoleCompareComponent } from './user-role-compare.component';
import { UcRoleZoneComponent } from './uc-role-zone/uc-role-zone.component';
import { UcRoleRolesComponent } from './uc-role-roles/uc-role-roles.component';
import { UcRoleInputComponent } from './uc-role-input/uc-role-input.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserRoleCompareComponent,
    UcRoleZoneComponent,
    UcRoleRolesComponent,
    UcRoleInputComponent
  ],
  imports: [
    SharedModule,
    UserRoleCompareRoutingModule
  ]
})
export class UserRoleCompareModule { }
