import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimafaReadingProgRoutingModule } from './simafa-reading-prog-routing.module';
import { SimafaReadingProgComponent } from './simafa-reading-prog.component';


@NgModule({
  declarations: [SimafaReadingProgComponent],
  imports: [
    CommonModule,
    SimafaReadingProgRoutingModule
  ]
})
export class SimafaReadingProgModule { }
