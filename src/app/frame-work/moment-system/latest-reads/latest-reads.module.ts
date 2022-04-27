import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { LatestReadsRoutingModule } from './latest-reads-routing.module';
import { LatestReadsComponent } from './latest-reads.component';


@NgModule({
  declarations: [
    LatestReadsComponent
  ],
  imports: [
    SharedPrimeNgModule,
    LatestReadsRoutingModule
  ]
})
export class LatestReadsModule { }
