import { ReqlogUsersLoginsDetailsComponent } from './reqlog-users-logins-details/reqlog-users-logins-details.component';
import { ReqlogUsersLoginsComponent } from './reqlog-users-logins.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ReqlogUsersLoginsComponent },
  { path: 'details', component: ReqlogUsersLoginsDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReqlogUsersLoginsRoutingModule { }
