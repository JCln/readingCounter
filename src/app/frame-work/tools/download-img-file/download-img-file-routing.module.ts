import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DownloadImgFileComponent } from './download-img-file.component';

const routes: Routes = [
  { path: '', component: DownloadImgFileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadImgFileRoutingModule { }
