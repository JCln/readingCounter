import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FrameWorkRoutingModule } from './frame-work-routing.module';
import { BaseInfoComponent } from './base-info/base-info.component';


@NgModule({
  declarations: [BaseInfoComponent],
  imports: [
    CommonModule,
    FrameWorkRoutingModule
  ]
})
export class FrameWorkModule { }
