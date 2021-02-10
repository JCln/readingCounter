import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AbDanUploadedInfoRoutingModule } from './ab-dan-uploaded-info-routing.module';
import { AbDanUploadedInfoComponent } from './ab-dan-uploaded-info.component';


@NgModule({
  declarations: [AbDanUploadedInfoComponent],
  imports: [
    CommonModule,
    AbDanUploadedInfoRoutingModule
  ]
})
export class AbDanUploadedInfoModule { }
