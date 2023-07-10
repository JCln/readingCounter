import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReadingPeriodKindRoutingModule } from './reading-period-kind-routing.module';
import { ReadingPeriodKindComponent } from './reading-period-kind.component';
import { RpkmAddDgComponent } from './rpkm-add-dg/rpkm-add-dg.component';


@NgModule({
  declarations: [ReadingPeriodKindComponent, RpkmAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    ReadingPeriodKindRoutingModule
  ]
})
export class ReadingPeriodKindModule { }
