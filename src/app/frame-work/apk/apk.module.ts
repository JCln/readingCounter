import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from './../../shared/shared.module';
import { ApkRoutingModule } from './apk-routing.module';
import { ApkComponent } from './apk.component';


@NgModule({
  declarations: [ApkComponent],
  imports: [
    SharedModule,
    FileUploadModule,
    ApkRoutingModule
  ]
})
export class ApkModule { }
