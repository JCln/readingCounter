import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionRoutingModule } from './region-routing.module';
import { RegionComponent } from './region.component';


@NgModule({
  declarations: [RegionComponent],
  imports: [
    CommonModule,
    RegionRoutingModule
  ]
})
export class RegionModule { }
