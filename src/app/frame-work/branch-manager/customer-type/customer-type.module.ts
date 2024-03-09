import { NgModule } from '@angular/core';

import { CustomerTypeRoutingModule } from './customer-type-routing.module';
import { CustomerTypeComponent } from './customer-type.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    CustomerTypeComponent
  ],
  imports: [
    SharedPrimeNgModule,
    CustomerTypeRoutingModule
  ]
})
export class CustomerTypeModule { }
