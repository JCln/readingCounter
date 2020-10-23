import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';


@NgModule({
  declarations: [ZoneComponent],
  imports: [
    CommonModule,
    ZoneRoutingModule
  ]
})
export class ZoneModule { }
