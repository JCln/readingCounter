import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessAddRoutingModule } from './assess-add-routing.module';
import { AssessAddComponent } from './assess-add.component';
import { AssesspreDgComponent } from './assesspre-dg/assesspre-dg.component';


@NgModule({
  declarations: [AssessAddComponent, AssesspreDgComponent],
  imports: [
    CommonModule,
    AssessAddRoutingModule
  ]
})
export class AssessAddModule { }
