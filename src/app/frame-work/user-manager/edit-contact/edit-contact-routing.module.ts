import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditContactComponent } from './edit-contact.component';

const routes: Routes = [
  { path: '', component: EditContactComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditContactRoutingModule { }
