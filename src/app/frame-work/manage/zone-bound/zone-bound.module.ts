import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ZoneBoundRoutingModule } from './zone-bound-routing.module';
import { ZoneBoundComponent } from './zone-bound.component';
import { ZoneBoundAddDgComponent } from './zone-bound-add-dg/zone-bound-add-dg.component';
import { ZoneBoundEditDgComponent } from './zone-bound-edit-dg/zone-bound-edit-dg.component';


@NgModule({
  declarations: [ZoneBoundComponent, ZoneBoundAddDgComponent, ZoneBoundEditDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ZoneBoundRoutingModule
  ]
})
export class ZoneBoundModule { }
