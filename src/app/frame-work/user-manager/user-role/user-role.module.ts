import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserRoleRoutingModule } from './user-role-routing.module';
import { UserRoleComponent } from './user-role.component';
import { RoleAddDgComponent } from './role-add-dg/role-add-dg.component';


@NgModule({
  declarations: [UserRoleComponent, RoleAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    UserRoleRoutingModule
  ]
})
export class UserRoleModule { }
