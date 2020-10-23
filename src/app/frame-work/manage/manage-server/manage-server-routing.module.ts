import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageServerComponent } from './manage-server.component';

const routes: Routes = [
  { path: '', component: ManageServerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageServerRoutingModule { }
