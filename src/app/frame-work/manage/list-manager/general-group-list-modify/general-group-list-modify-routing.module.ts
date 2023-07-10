import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralGroupListModifyComponent } from './general-group-list-modify.component';

const routes: Routes = [
  { path: '', component: GeneralGroupListModifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralGroupListModifyRoutingModule { }
