import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { DescRoutingModule } from './desc-routing.module';
import { DescComponent } from './desc.component';
import { TimeLineComponent } from './time-line/time-line.component';


@NgModule({
  declarations: [DescComponent, TimeLineComponent],
  imports: [
    SharedPrimeNgModule,
    DescRoutingModule
  ]
})
export class DescModule { }
