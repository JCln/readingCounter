import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ZoneBoundRoutingModule } from './zone-bound-routing.module';
import { ZoneBoundComponent } from './zone-bound.component';


@NgModule({
  declarations: [ZoneBoundComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ZoneBoundRoutingModule
  ]
})
export class ZoneBoundModule { }
