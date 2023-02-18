import { NgModule } from '@angular/core';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { DownloadImgTwoFileRoutingModule } from './download-img-two-file-routing.module';
import { DownloadImgTwoFileComponent } from './download-img-two-file.component';


@NgModule({
  declarations: [
    DownloadImgTwoFileComponent
  ],
  imports: [
    SharedCollapseModule,
    SharedThreeModule,
    SharedPrimeNgModule,
    DownloadImgTwoFileRoutingModule
  ]
})
export class DownloadImgTwoFileModule { }
