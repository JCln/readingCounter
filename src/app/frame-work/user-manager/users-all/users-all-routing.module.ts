import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersAllComponent } from './users-all.component';

const routes: Routes = [
  { path: '', component: UsersAllComponent },
  { path: 'loggins', loadChildren: () => import('./user-loggins/user-loggins.module').then(userLoggins => userLoggins.UserLogginsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersAllRoutingModule { }
