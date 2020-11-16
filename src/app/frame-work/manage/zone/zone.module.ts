import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';
import { ZoneAddDgComponent } from './zone-add-dg/zone-add-dg.component';


@NgModule({
  declarations: [ZoneComponent, ZoneAddDgComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ZoneRoutingModule
  ]
})
export class ZoneModule { }
