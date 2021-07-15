import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessAddRoutingModule } from './assess-add-routing.module';
import { AssessAddComponent } from './assess-add.component';


@NgModule({
  declarations: [AssessAddComponent],
  imports: [
    CommonModule,
    AssessAddRoutingModule
  ]
})
export class AssessAddModule { }
