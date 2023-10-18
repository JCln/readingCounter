import { NgModule } from '@angular/core';

import { DownloadAttemptsRoutingModule } from './download-attempts-routing.module';
import { DownloadAttemptsComponent } from './download-attempts.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';


@NgModule({
  declarations: [
    DownloadAttemptsComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedCollapseModule,
    DownloadAttemptsRoutingModule
  ]
})
export class DownloadAttemptsModule { }
