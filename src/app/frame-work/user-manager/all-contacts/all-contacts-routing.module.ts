import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllContactsComponent } from './all-contacts.component';

const routes: Routes = [
  { path: '', component: AllContactsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllContactsRoutingModule { }
