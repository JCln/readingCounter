import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessPreRoutingModule } from './assess-pre-routing.module';
import { AssessPreComponent } from './assess-pre.component';


@NgModule({
  declarations: [AssessPreComponent],
  imports: [
    CommonModule,
    AssessPreRoutingModule
  ]
})
export class AssessPreModule { }
