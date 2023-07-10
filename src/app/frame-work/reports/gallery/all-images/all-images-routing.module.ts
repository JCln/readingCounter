import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllImagesComponent } from './all-images.component';

const routes: Routes = [
  { path: '', component: AllImagesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllImagesRoutingModule { }
