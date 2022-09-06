import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { RequestLogRoutingModule } from './request-log-routing.module';
import { RequestLogComponent } from './request-log.component';


@NgModule({
  declarations: [
    RequestLogComponent
  ],
  imports: [
    SharedModule,
    SharedThreeModule,
    SharedPrimeNgModule,
    RequestLogRoutingModule
  ]
})
export class RequestLogModule { }
