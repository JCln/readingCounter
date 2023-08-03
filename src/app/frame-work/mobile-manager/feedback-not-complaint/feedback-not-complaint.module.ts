import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackNotComplaintRoutingModule } from './feedback-not-complaint-routing.module';
import { FeedbackNotComplaintComponent } from './feedback-not-complaint.component';


@NgModule({
  declarations: [
    FeedbackNotComplaintComponent
  ],
  imports: [
    CommonModule,
    FeedbackNotComplaintRoutingModule
  ]
})
export class FeedbackNotComplaintModule { }
