import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { GisRoutingModule } from './gis-routing.module';
import { GisComponent } from './gis.component';

@NgModule({
  declarations: [GisComponent],
  imports: [
    SharedModule,
    SharedThreeModule,
    GisRoutingModule
  ]
})
export class GisModule { }
