import { NgModule } from '@angular/core';

import { IpfilterGetInvalidTimeRoutingModule } from './ipfilter-get-invalid-time-routing.module';
import { IpfilterGetInvalidTimeComponent } from './ipfilter-get-invalid-time.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';


@NgModule({
  declarations: [
    IpfilterGetInvalidTimeComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedCollapseModule,
    IpfilterGetInvalidTimeRoutingModule
  ]
})
export class IpfilterGetInvalidTimeModule { }
