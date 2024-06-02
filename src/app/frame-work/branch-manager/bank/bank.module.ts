import { NgModule } from '@angular/core';

import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { BankDgComponent } from './bank-dg/bank-dg.component';


@NgModule({
  declarations: [
    BankComponent,
    BankDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    BankRoutingModule
  ]
})
export class BankModule { }
