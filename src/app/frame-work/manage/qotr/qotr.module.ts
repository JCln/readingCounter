import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QotrRoutingModule } from './qotr-routing.module';
import { QotrComponent } from './qotr.component';


@NgModule({
  declarations: [QotrComponent],
  imports: [
    CommonModule,
    QotrRoutingModule
  ]
})
export class QotrModule { }
