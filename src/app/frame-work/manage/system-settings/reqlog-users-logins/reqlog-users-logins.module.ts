import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { NgModule } from '@angular/core';

import { ReqlogUsersLoginsRoutingModule } from './reqlog-users-logins-routing.module';
import { ReqlogUsersLoginsComponent } from './reqlog-users-logins.component';
import { ReqlogUsersLoginsDetailsComponent } from './reqlog-users-logins-details/reqlog-users-logins-details.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

@NgModule({
  declarations: [
    ReqlogUsersLoginsComponent,
    ReqlogUsersLoginsDetailsComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedCollapseModule,
    ReqlogUsersLoginsRoutingModule
  ]
})
export class ReqlogUsersLoginsModule { }
