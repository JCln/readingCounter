import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FragmentDetailsComponent } from './fragment-details.component';

const routes: Routes = [
  { path: '', component: FragmentDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FragmentDetailsRoutingModule { }
