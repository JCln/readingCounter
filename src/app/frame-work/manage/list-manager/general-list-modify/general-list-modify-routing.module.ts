import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralListModifyComponent } from './general-list-modify.component';

const routes: Routes = [
  { path: '', component: GeneralListModifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralListModifyRoutingModule { }
