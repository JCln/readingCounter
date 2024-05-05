import { NgModule } from '@angular/core';

import { InvoiceTypeRoutingModule } from './invoice-type-routing.module';
import { InvoiceTypeComponent } from './invoice-type.component';
import { InvoiceTypeDgComponent } from './invoice-type-dg/invoice-type-dg.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    InvoiceTypeComponent,
    InvoiceTypeDgComponent
  ],
  imports: [
    SharedPrimeNgModule,
    InvoiceTypeRoutingModule
  ]
})
export class InvoiceTypeModule { }
