import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { UserRoleRoutingModule } from './user-role-routing.module';
import { UserRoleComponent } from './user-role.component';


@NgModule({
  declarations: [UserRoleComponent],
  imports: [
    SharedPrimeNgModule,
    UserRoleRoutingModule
  ]
})
export class UserRoleModule { }
