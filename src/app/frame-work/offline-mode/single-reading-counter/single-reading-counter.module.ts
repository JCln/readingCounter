import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { NgModule } from '@angular/core';
import { SingleReadingCounterRoutingModule } from './single-reading-counter-routing.module';
import { SingleReadingCounterComponent } from './single-reading-counter.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SingleReadingCounterComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedCollapseModule,
    SingleReadingCounterRoutingModule
  ]
})
export class SingleReadingCounterModule { }
