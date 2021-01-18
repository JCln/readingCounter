import { NgModule } from '@angular/core';

import { SharedModule } from './../../../../shared/shared.module';
import { FollowUpRoutingModule } from './follow-up-routing.module';
import { FollowUpComponent } from './follow-up.component';


@NgModule({
  declarations: [FollowUpComponent],
  imports: [
    SharedModule,
    FollowUpRoutingModule
  ]
})
export class FollowUpModule { }
