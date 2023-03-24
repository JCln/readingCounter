import { NgModule } from '@angular/core';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FollowUpRoutingModule } from './follow-up-routing.module';
import { FollowUpComponent } from './follow-up.component';
import { TimeLineComponent } from './time-line/time-line.component';

@NgModule({
  declarations: [FollowUpComponent, TimeLineComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedCollapseModule,
    FollowUpRoutingModule
  ]
})
export class FollowUpModule { }
