import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLogginsComponent } from './user-loggins.component';

const routes: Routes = [
  { path: '', component: UserLogginsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLogginsRoutingModule { }
