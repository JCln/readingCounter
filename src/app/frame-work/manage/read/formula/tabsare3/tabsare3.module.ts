import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { Tabsare3RoutingModule } from './tabsare3-routing.module';
import { Tabsare3Component } from './tabsare3.component';


@NgModule({
  declarations: [Tabsare3Component],
  imports: [
    SharedPrimeNgModule,
    Tabsare3RoutingModule
  ]
})
export class Tabsare3Module { }
