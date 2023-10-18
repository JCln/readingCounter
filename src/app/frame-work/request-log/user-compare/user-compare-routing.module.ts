import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCompareComponent } from './user-compare.component';

const routes: Routes = [
  { path: '', component: UserCompareComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCompareRoutingModule { }
