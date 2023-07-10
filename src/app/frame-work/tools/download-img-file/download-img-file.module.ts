import { NgModule } from '@angular/core';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { DownloadImgFileRoutingModule } from './download-img-file-routing.module';
import { DownloadImgFileComponent } from './download-img-file.component';


@NgModule({
  declarations: [
    DownloadImgFileComponent
  ],
  imports: [
    SharedCollapseModule,
    SharedThreeModule,
    SharedPrimeNgModule,
    DownloadImgFileRoutingModule
  ]
})
export class DownloadImgFileModule { }
