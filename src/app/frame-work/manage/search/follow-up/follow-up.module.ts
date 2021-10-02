import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FollowUpRoutingModule } from './follow-up-routing.module';
import { FollowUpComponent } from './follow-up.component';
import { TimeLineComponent } from './time-line/time-line.component';


@NgModule({
  declarations: [FollowUpComponent, TimeLineComponent],
  imports: [
    SharedPrimeNgModule,
    SharedModule,
    SharedTwoModule,
    FollowUpRoutingModule
  ]
})
export class FollowUpModule { }
