import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImageAttrFileResultComponent } from './image-attr-file-result.component';

const routes: Routes = [
  { path: '', component: ImageAttrFileResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageAttrFileResultRoutingModule { }
