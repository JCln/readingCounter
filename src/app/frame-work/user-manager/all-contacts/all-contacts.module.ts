import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedPrimeNgModule } from './../../../shared/shared-prime-ng.module';
import { AllContactsRoutingModule } from './all-contacts-routing.module';
import { AllContactsComponent } from './all-contacts.component';

@NgModule({
  declarations: [AllContactsComponent],
  imports: [
    CommonModule,
    SharedPrimeNgModule,
    AllContactsRoutingModule
  ]
})
export class AllContactsModule { }
