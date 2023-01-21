import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserOnlinesComponent } from './user-onlines.component';

const routes: Routes = [
  { path: '', component: UserOnlinesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOnlinesRoutingModule { }
