import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { AbDanUploadedInfoRoutingModule } from './ab-dan-uploaded-info-routing.module';
import { AbDanUploadedInfoComponent } from './ab-dan-uploaded-info.component';


@NgModule({
  declarations: [AbDanUploadedInfoComponent],
  imports: [
    SharedTwoModule,
    AbDanUploadedInfoRoutingModule
  ]
})
export class AbDanUploadedInfoModule { }
