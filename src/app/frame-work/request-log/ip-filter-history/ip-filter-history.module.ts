import { NgModule } from '@angular/core';

import { IpFilterHistoryRoutingModule } from './ip-filter-history-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { IpFilterHistoryComponent } from './ip-filter-history.component';
import { CompareComponent } from './compare/compare.component';


@NgModule({
  declarations: [
    IpFilterHistoryComponent,
    CompareComponent
  ],
  imports: [
    SharedPrimeNgModule,
    IpFilterHistoryRoutingModule
  ]
})
export class IpFilterHistoryModule { }
