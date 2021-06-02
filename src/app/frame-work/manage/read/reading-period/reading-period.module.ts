import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReadingPeriodRoutingModule } from './reading-period-routing.module';
import { ReadingPeriodComponent } from './reading-period.component';
import { RpmAddDgComponent } from './rpm-add-dg/rpm-add-dg.component';


@NgModule({
  declarations: [ReadingPeriodComponent, RpmAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    ReadingPeriodRoutingModule
  ]
})
export class ReadingPeriodModule { }
