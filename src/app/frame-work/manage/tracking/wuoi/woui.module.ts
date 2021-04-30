import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { AbDanUploadedInfoRoutingModule } from './woui-routing.module';
import { WouiComponent } from './woui.component';


@NgModule({
  declarations: [WouiComponent],
  imports: [
    SharedTwoModule,
    SharedPrimeNgModule,
    AbDanUploadedInfoRoutingModule
  ]
})
export class AbDanUploadedInfoModule { }
