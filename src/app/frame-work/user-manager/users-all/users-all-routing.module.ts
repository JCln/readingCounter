import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersAllComponent } from './users-all.component';

const routes: Routes = [
  { path: '', component: UsersAllComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersAllRoutingModule { }
