import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { AbDanUploadedInfoRoutingModule } from './ab-dan-uploaded-info-routing.module';
import { AbDanUploadedInfoComponent } from './ab-dan-uploaded-info.component';


@NgModule({
  declarations: [AbDanUploadedInfoComponent],
  imports: [
    SharedTwoModule,
    SharedPrimeNgModule,
    AbDanUploadedInfoRoutingModule
  ]
})
export class AbDanUploadedInfoModule { }
