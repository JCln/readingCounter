import { NgModule } from '@angular/core';

import { FlowStateRoutingModule } from './flow-state-routing.module';
import { FlowStateDgComponent } from './flow-state-dg/flow-state-dg.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { FlowStateComponent } from './flow-state.component';


@NgModule({
  declarations: [
    FlowStateComponent,
    FlowStateDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    FlowStateRoutingModule
  ]
})
export class FlowStateModule { }
