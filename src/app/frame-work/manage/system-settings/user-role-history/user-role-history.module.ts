import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { NgModule } from '@angular/core';

import { UserRoleHistoryRoutingModule } from './user-role-history-routing.module';
import { UserRoleHistoryComponent } from './user-role-history.component';
import { UserRoleHistoryDetailsComponent } from './user-role-history-details/user-role-history-details.component';
import { UserRoleHistorySummaryComponent } from './user-role-history-summary/user-role-history-summary.component';


@NgModule({
  declarations: [
    UserRoleHistoryComponent,
    UserRoleHistoryDetailsComponent,
    UserRoleHistorySummaryComponent
  ],
  imports: [
    SharedPrimeNgModule,
    UserRoleHistoryRoutingModule
  ]
})
export class UserRoleHistoryModule { }
