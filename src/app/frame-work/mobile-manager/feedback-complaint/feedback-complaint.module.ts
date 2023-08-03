import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackComplaintRoutingModule } from './feedback-complaint-routing.module';
import { FeedbackComplaintComponent } from './feedback-complaint.component';


@NgModule({
  declarations: [
    FeedbackComplaintComponent
  ],
  imports: [
    CommonModule,
    FeedbackComplaintRoutingModule
  ]
})
export class FeedbackComplaintModule { }
