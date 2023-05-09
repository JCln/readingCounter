import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { RequestLogRoutingModule } from './request-log-routing.module';
import { RequestLogComponent } from './request-log.component';


@NgModule({
  declarations: [
    RequestLogComponent
  ],
  imports: [
    SharedThreeModule,
    SharedPrimeNgModule,
    RequestLogRoutingModule
  ]
})
export class RequestLogModule { }
