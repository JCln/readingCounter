import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { FinishedRoutingModule } from './finished-routing.module';
import { FinishedComponent } from './finished.component';


@NgModule({
  declarations: [FinishedComponent],
  imports: [
    SharedPrimeNgModule,
    FinishedRoutingModule
  ]
})
export class FinishedModule { }
