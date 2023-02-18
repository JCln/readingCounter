import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RrFragmentComponent } from './rr-fragment.component';

const routes: Routes = [
  { path: '', component: RrFragmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrFragmentRoutingModule { }
