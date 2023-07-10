import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { QotrRoutingModule } from './qotr-routing.module';
import { QotrComponent } from './qotr.component';


@NgModule({
  declarations: [QotrComponent],
  imports: [
    SharedPrimeNgModule,
    QotrRoutingModule
  ]
})
export class QotrModule { }
