import { UserRoleHistorySummaryComponent } from './user-role-history-summary/user-role-history-summary.component';
import { UserRoleHistoryComponent } from './user-role-history.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserRoleHistoryComponent },
  { path: 'details', component: UserRoleHistorySummaryComponent },
  { path: 'loggins', loadChildren: () => import('./user-loggins/user-loggins.module').then(userLoggins => userLoggins.UserLogginsModule) },
  { path: 'blockedUsers', loadChildren: () => import('./blocked-users/blocked-users.module').then(blockedUsers => blockedUsers.BlockedUsersModule) },
  { path: 'byUserId', loadChildren: () => import('./byuserid/byuserid.module').then(userActivationByUserId => userActivationByUserId.ByuseridModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleHistoryRoutingModule { }
