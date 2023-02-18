import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FileUploadSingleRoutingModule } from './file-upload-single-routing.module';
import { FileUploadSingleComponent } from './file-upload-single.component';


@NgModule({
  declarations: [
    FileUploadSingleComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    FileUploadSingleRoutingModule
  ]
})
export class FileUploadSingleModule { }
