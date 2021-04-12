import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { RouteReuseStrategyService } from 'src/app/services/route-reuse-strategy.service';

import { SharedPrimeNgModule } from './../../../shared/shared-prime-ng.module';
import { AllContactsRoutingModule } from './all-contacts-routing.module';
import { AllContactsComponent } from './all-contacts.component';

@NgModule({
  declarations: [AllContactsComponent],
  imports: [
    SharedPrimeNgModule,
    AllContactsRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: RouteReuseStrategyService }
  ]
})
export class AllContactsModule { }
