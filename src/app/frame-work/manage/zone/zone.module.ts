import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';


@NgModule({
  declarations: [ZoneComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ZoneRoutingModule
  ]
})
export class ZoneModule { }
