import { NgModule } from '@angular/core';

import { UploadAttemptsRoutingModule } from './upload-attempts-routing.module';
import { UploadAttemptsComponent } from './upload-attempts.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';


@NgModule({
  declarations: [
    UploadAttemptsComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedCollapseModule,
    UploadAttemptsRoutingModule
  ]
})
export class UploadAttemptsModule { }
