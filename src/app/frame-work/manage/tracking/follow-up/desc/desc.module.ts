import { NgModule } from '@angular/core';

import { SharedModule } from './../../../../../shared/shared.module';
import { DescRoutingModule } from './desc-routing.module';
import { DescComponent } from './desc.component';


@NgModule({
  declarations: [DescComponent],
  imports: [
    SharedModule,
    DescRoutingModule
  ]
})
export class DescModule { }
