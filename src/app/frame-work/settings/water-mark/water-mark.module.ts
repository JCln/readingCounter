import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { WaterMarkRoutingModule } from './water-mark-routing.module';
import { WaterMarkComponent } from './water-mark.component';


@NgModule({
  declarations: [
    WaterMarkComponent
  ],
  imports: [
    SharedTwoModule,
    WaterMarkRoutingModule
  ]
})
export class WaterMarkModule { }
