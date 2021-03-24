import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllContactsComponent } from './all-contacts.component';

const routes: Routes = [
  { path: '', component: AllContactsComponent },
  { path: 'loggins/:UUID', loadChildren: () => import('./user-loggins/user-loggins.module').then(userLoggins => userLoggins.UserLogginsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllContactsRoutingModule { }
