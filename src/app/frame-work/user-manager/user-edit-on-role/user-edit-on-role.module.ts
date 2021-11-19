import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserEditOnRoleRoutingModule } from './user-edit-on-role-routing.module';
import { UserActionComponent } from './user-action/user-action.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserEditOnRoleComponent } from './user-edit-on-role.component';


@NgModule({
  declarations: [
    UserActionComponent,
    UserRoleComponent,
    UserEditOnRoleComponent
  ],
  imports: [
    SharedModule,
    UserEditOnRoleRoutingModule
  ]
})
export class UserEditOnRoleModule { }
