import { NgModule } from '@angular/core';

import { IpFilterRoutingModule } from './ip-filter-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { IpFilterComponent } from './ip-filter.component';


@NgModule({
  declarations: [
    IpFilterComponent
  ],
  imports: [
    SharedPrimeNgModule,
    IpFilterRoutingModule
  ]
})
export class IpFilterModule { }
