import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FragmentComponent } from './fragment.component';

const routes: Routes = [
  { path: '', component: FragmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FragmentRoutingModule { }
