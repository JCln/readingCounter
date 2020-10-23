import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ZoneBoundComponent } from './zone-bound/zone-bound.component';


@NgModule({
  declarations: [ZoneBoundComponent],
  imports: [
    CommonModule,
    ManageRoutingModule
  ]
})
export class ManageModule { }
