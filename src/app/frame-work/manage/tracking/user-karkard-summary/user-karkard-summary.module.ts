import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

import { UserKarkardSummaryRoutingModule } from './user-karkard-summary-routing.module';
import { UserKarkardSummaryComponent } from './user-karkard-summary.component';


@NgModule({
  declarations: [
    UserKarkardSummaryComponent
  ],
  imports: [
    SharedModule,
    SharedThreeModule,
    SharedPrimeNgModule,
    UserKarkardSummaryRoutingModule
  ]
})
export class UserKarkardSummaryModule { }
