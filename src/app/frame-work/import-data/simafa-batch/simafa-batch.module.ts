import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimafaBatchRoutingModule } from './simafa-batch-routing.module';
import { SimafaBatchComponent } from './simafa-batch.component';


@NgModule({
  declarations: [SimafaBatchComponent],
  imports: [
    CommonModule,
    SimafaBatchRoutingModule
  ]
})
export class SimafaBatchModule { }
