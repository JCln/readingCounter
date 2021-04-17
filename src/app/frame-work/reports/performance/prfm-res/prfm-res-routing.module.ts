import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrfmResComponent } from './prfm-res.component';

const routes: Routes = [
  { path: '', component: PrfmResComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrfmResRoutingModule { }
