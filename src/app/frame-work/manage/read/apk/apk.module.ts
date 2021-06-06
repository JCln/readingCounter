import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ApkRoutingModule } from './apk-routing.module';
import { ApkComponent } from './apk.component';


@NgModule({
  declarations: [ApkComponent],
  imports: [
    SharedPrimeNgModule,
    FileUploadModule,
    ApkRoutingModule
  ]
})
export class ApkModule { }
