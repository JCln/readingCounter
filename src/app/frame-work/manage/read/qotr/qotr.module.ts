import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { QotrRoutingModule } from './qotr-routing.module';
import { QotrComponent } from './qotr.component';


@NgModule({
  declarations: [QotrComponent],
  imports: [
    SharedModule,
    QotrRoutingModule
  ]
})
export class QotrModule { }
