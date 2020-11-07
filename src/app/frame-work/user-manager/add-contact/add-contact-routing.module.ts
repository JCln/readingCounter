import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddContactComponent } from './add-contact.component';

const routes: Routes = [
  { path: '', component: AddContactComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddContactRoutingModule { }
