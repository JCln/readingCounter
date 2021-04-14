import { NgModule } from '@angular/core';
import { SharedTwoModule } from 'src/app/shared/shared-two.module';

import { FollowUpRoutingModule } from './follow-up-routing.module';
import { FollowUpComponent } from './follow-up.component';


@NgModule({
  declarations: [FollowUpComponent],
  imports: [
    SharedTwoModule,
    FollowUpRoutingModule
  ]
})
export class FollowUpModule { }
