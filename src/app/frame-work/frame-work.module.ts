import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FrameWorkRoutingModule } from './frame-work-routing.module';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    FrameWorkRoutingModule
  ]
})
export class FrameWorkModule { }
