import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FrameWorkRoutingModule } from './frame-work-routing.module';
import { BaseInfoComponent } from './base-info/base-info.component';
import { RoleManagerComponent } from './role-manager/role-manager.component';


@NgModule({
  declarations: [BaseInfoComponent, RoleManagerComponent],
  imports: [
    CommonModule,
    FrameWorkRoutingModule
  ]
})
export class FrameWorkModule { }
