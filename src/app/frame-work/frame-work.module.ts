import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseInfoComponent } from './base-info/base-info.component';
import { FrameWorkRoutingModule } from './frame-work-routing.module';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [BaseInfoComponent, MapComponent],
  imports: [
    CommonModule,
    FrameWorkRoutingModule
  ]
})
export class FrameWorkModule { }
