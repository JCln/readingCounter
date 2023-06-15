import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { NgModule } from '@angular/core';

import { UserRoleHistoryRoutingModule } from './user-role-history-routing.module';
import { UserRoleHistoryComponent } from './user-role-history.component';


@NgModule({
  declarations: [
    UserRoleHistoryComponent
  ],
  imports: [
    SharedPrimeNgModule,
    UserRoleHistoryRoutingModule
  ]
})
export class UserRoleHistoryModule { }
