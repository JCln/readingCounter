import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RandomImagesComponent } from './random-images.component';

const routes: Routes = [
  { path: '', component: RandomImagesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomImagesRoutingModule { }
