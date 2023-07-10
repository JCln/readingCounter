import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RrInstateComponent } from './rr-instate.component';

const routes: Routes = [
  { path: '', component: RrInstateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrInstateRoutingModule { }
