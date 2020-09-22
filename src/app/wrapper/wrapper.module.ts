import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapComponent } from './map/map.component';
import { WrapperRoutingModule } from './wrapper-routing.module';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    WrapperRoutingModule
  ]
})
export class WrapperModule { }
