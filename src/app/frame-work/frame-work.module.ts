import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FrameWorkRoutingModule } from './frame-work-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    FrameWorkRoutingModule
  ]
})
export class FrameWorkModule { }
