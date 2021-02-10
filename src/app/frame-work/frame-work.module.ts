import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { BaseInfoComponent } from './base-info/base-info.component';
import { FrameWorkRoutingModule } from './frame-work-routing.module';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [BaseInfoComponent, MapComponent],
  imports: [
    CommonModule,
    SharedPrimeNgModule,
    FrameWorkRoutingModule
  ]
})
export class FrameWorkModule { }
