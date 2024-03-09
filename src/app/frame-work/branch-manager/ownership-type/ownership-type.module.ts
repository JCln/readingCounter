import { NgModule } from '@angular/core';

import { OwnershipTypeRoutingModule } from './ownership-type-routing.module';
import { OwnershipTypeComponent } from './ownership-type.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    OwnershipTypeComponent
  ],
  imports: [
    SharedPrimeNgModule,
    OwnershipTypeRoutingModule
  ]
})
export class OwnershipTypeModule { }
