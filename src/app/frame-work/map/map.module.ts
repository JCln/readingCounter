import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MapRoutingModule } from './map-routing.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MapRoutingModule
  ]
})
export class MapModule { }
