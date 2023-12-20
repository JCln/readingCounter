import { NgModule } from '@angular/core';
import { OffTxtOutRoutingModule } from './off-txt-out-routing.module';
import { OffTxtOutComponent } from './off-txt-out.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    OffTxtOutComponent
  ],
  imports: [
    SharedPrimeNgModule,
    OffTxtOutRoutingModule
  ]
})
export class OffTxtOutModule { }
