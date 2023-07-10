import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListModifyComponent } from './list-modify.component';

const routes: Routes = [
  { path: '', component: ListModifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListModifyRoutingModule { }
