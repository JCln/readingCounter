import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleCompareComponent } from './user-role-compare.component';

const routes: Routes = [
  { path: '', component: UserRoleCompareComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleCompareRoutingModule { }
