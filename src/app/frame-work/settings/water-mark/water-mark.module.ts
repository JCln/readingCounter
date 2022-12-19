import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterMarkRoutingModule } from './water-mark-routing.module';
import { WaterMarkComponent } from './water-mark.component';


@NgModule({
  declarations: [
    WaterMarkComponent
  ],
  imports: [
    CommonModule,
    WaterMarkRoutingModule
  ]
})
export class WaterMarkModule { }
