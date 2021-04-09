import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SharedThreeModule } from './../../../shared/shared_three.module';
import { DisposalHoursResComponent } from './disposal-hours-res/disposal-hours-res.component';
import { DisposalHoursRoutingModule } from './disposal-hours-routing.module';
import { DisposalHoursComponent } from './disposal-hours.component';


@NgModule({
  declarations: [DisposalHoursComponent, DisposalHoursResComponent],
  imports: [
    SharedPrimeNgModule,
    SharedThreeModule,
    SharedModule,
    DisposalHoursRoutingModule
  ]
})
export class DisposalHoursModule { }
