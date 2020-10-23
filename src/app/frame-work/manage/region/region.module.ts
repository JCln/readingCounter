import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { RegionRoutingModule } from './region-routing.module';
import { RegionComponent } from './region.component';


@NgModule({
  declarations: [RegionComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RegionRoutingModule
  ]
})
export class RegionModule { }
