import { UserRoleHistorySummaryComponent } from './user-role-history-summary/user-role-history-summary.component';
import { UserRoleHistoryComponent } from './user-role-history.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserRoleHistoryComponent },
  { path: 'details', component: UserRoleHistorySummaryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleHistoryRoutingModule { }