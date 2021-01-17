import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FollowUpRoutingModule } from './follow-up-routing.module';
import { FollowUpComponent } from './follow-up.component';


@NgModule({
  declarations: [FollowUpComponent],
  imports: [
    CommonModule,
    FollowUpRoutingModule
  ]
})
export class FollowUpModule { }
