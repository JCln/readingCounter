import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { ReadingRoutingModule } from './reading-routing.module';
import { ReadingComponent } from './reading.component';


@NgModule({
  declarations: [ReadingComponent],
  imports: [
    SharedPrimeNgModule,
    ReadingRoutingModule
  ]
})
export class ReadingModule { }
