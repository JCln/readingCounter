import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { OffTxtOutRoutingModule } from './off-txt-out-routing.module';
import { OffTxtOutComponent } from './off-txt-out.component';


@NgModule({
  declarations: [
    OffTxtOutComponent
  ],
  imports: [
    SharedTwoModule,
    OffTxtOutRoutingModule
  ]
})
export class OffTxtOutModule { }
