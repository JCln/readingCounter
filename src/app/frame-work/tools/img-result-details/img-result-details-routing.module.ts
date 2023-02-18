import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImgResultDetailsComponent } from './img-result-details.component';

const routes: Routes = [
  { path: '', component: ImgResultDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImgResultDetailsRoutingModule { }
