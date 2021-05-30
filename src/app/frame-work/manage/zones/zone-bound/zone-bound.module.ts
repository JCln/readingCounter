import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ZoneBoundAddDgComponent } from './zone-bound-add-dg/zone-bound-add-dg.component';
import { ZoneBoundRoutingModule } from './zone-bound-routing.module';
import { ZoneBoundComponent } from './zone-bound.component';


@NgModule({
  declarations: [ZoneBoundComponent, ZoneBoundAddDgComponent],
  imports: [
    SharedModule,
    SharedPrimeNgModule,
    ReactiveFormsModule,
    ZoneBoundRoutingModule
  ]
})
export class ZoneBoundModule { }
