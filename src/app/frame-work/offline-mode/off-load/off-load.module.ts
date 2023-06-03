import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { OffLoadRoutingModule } from './off-load-routing.module';
import { OffLoadComponent } from './off-load.component';


@NgModule({
  declarations: [
    OffLoadComponent
  ],
  imports: [
    SharedPrimeNgModule,
    OffLoadRoutingModule
  ]
})
export class OffLoadModule { }
