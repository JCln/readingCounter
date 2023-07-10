import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImageAttributionComponent } from './image-attribution.component';

const routes: Routes = [
  { path: '', component: ImageAttributionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageAttributionRoutingModule { }
