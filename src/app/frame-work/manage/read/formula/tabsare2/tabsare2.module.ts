import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { Tabsare2RoutingModule } from './tabsare2-routing.module';
import { Tabsare2Component } from './tabsare2.component';


@NgModule({
  declarations: [Tabsare2Component],
  imports: [
    SharedPrimeNgModule,
    Tabsare2RoutingModule
  ]
})
export class Tabsare2Module { }
