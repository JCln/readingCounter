import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImgResultDetailsGridBasedComponent } from './img-result-details-grid-based.component';

const routes: Routes = [
  { path: '', component: ImgResultDetailsGridBasedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImgResultDetailsGridBasedRoutingModule { }
