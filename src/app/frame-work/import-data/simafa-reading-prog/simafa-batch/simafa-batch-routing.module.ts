import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimafaBatchComponent } from './simafa-batch.component';

const routes: Routes = [
  { path: '', component: SimafaBatchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimafaBatchRoutingModule { }
