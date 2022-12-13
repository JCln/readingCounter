import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FileUploadSingleComponent } from './file-upload-single.component';

const routes: Routes = [
  { path: '', component: FileUploadSingleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileUploadSingleRoutingModule { }
