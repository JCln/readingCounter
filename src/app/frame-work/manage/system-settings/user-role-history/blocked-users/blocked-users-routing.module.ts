import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockedUsersComponent } from './blocked-users.component';

const routes: Routes = [
  { path: '', component: BlockedUsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockedUsersRoutingModule { }
