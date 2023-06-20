import { ReqlogUsersLoginsComponent } from './reqlog-users-logins.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ReqlogUsersLoginsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReqlogUsersLoginsRoutingModule { }
