import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DownloadImgTwoFileComponent } from './download-img-two-file.component';

const routes: Routes = [
  { path: '', component: DownloadImgTwoFileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadImgTwoFileRoutingModule { }
