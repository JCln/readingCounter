import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { FileUploadSingleRoutingModule } from './file-upload-single-routing.module';
import { FileUploadSingleComponent } from './file-upload-single.component';


@NgModule({
  declarations: [
    FileUploadSingleComponent
  ],
  imports: [
    SharedTwoModule,
    FileUploadSingleRoutingModule
  ]
})
export class FileUploadSingleModule { }
