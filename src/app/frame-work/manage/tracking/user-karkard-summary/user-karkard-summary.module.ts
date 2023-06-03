import { NgModule } from '@angular/core';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
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
    SharedCollapseModule,
    UserKarkardSummaryRoutingModule
  ]
})
export class UserKarkardSummaryModule { }
