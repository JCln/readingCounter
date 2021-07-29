import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimafaSingleComponent } from './simafa-single.component';

const routes: Routes = [
  { path: '', component: SimafaSingleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimafaSingleRoutingModule { }
