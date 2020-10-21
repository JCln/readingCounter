import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseInfoRoutingModule } from './base-info-routing.module';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    BaseInfoRoutingModule
  ]
})
export class BaseInfoModule { }
