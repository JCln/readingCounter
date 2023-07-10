import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserActionComponent } from './user-action/user-action.component';
import { UserEditOnRoleRoutingModule } from './user-edit-on-role-routing.module';
import { UserEditOnRoleComponent } from './user-edit-on-role.component';
import { UserRoleComponent } from './user-role/user-role.component';


@NgModule({
  declarations: [
    UserActionComponent,
    UserRoleComponent,
    UserEditOnRoleComponent
  ],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    UserEditOnRoleRoutingModule
  ]
})
export class UserEditOnRoleModule { }
