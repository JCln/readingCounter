import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrapperRoutingModule } from './wrapper-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrameWorkComponent } from './frame-work/frame-work.component';


@NgModule({
  declarations: [DashboardComponent, FrameWorkComponent],
  imports: [
    CommonModule,
    WrapperRoutingModule
  ]
})
export class WrapperModule { }
