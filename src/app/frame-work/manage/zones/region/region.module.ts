import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { RegionRoutingModule } from './region-routing.module';
import { RegionComponent } from './region.component';
import { RegionAddDgComponent } from './region-add-dg/region-add-dg.component';
import { RegionEditDgComponent } from './region-edit-dg/region-edit-dg.component';


@NgModule({
  declarations: [RegionComponent, RegionAddDgComponent, RegionEditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RegionRoutingModule
  ]
})
export class RegionModule { }
