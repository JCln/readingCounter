import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KarkardAllStatesComponent } from './karkard-all-states.component';

const routes: Routes = [
  { path: '', component: KarkardAllStatesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KarkardAllStatesRoutingModule { }
