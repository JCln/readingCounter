import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseInfoComponent } from './base-info/base-info.component';
import { FrameWorkRoutingModule } from './frame-work-routing.module';


@NgModule({
  declarations: [BaseInfoComponent],
  imports: [
    CommonModule,
    FrameWorkRoutingModule
  ]
})
export class FrameWorkModule { }
