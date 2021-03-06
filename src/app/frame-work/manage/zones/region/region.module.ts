import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { RegionAddDgComponent } from './region-add-dg/region-add-dg.component';
import { RegionRoutingModule } from './region-routing.module';
import { RegionComponent } from './region.component';


@NgModule({
  declarations: [RegionComponent, RegionAddDgComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    RegionRoutingModule
  ]
})
export class RegionModule { }
