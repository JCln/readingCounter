import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { TrackingRoutingModule } from './tracking-routing.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    SharedThreeModule,
    TrackingRoutingModule
  ]
})
export class TrackingModule { }
