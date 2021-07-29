import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { SimafaBatchRoutingModule } from './simafa-batch-routing.module';
import { SimafaBatchComponent } from './simafa-batch.component';


@NgModule({
  declarations: [SimafaBatchComponent],
  imports: [
    SharedModule,
    SimafaBatchRoutingModule
  ]
})
export class SimafaBatchModule { }
