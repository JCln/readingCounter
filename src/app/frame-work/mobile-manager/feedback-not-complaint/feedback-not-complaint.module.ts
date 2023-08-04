import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { NgModule } from '@angular/core';

import { FeedbackNotComplaintRoutingModule } from './feedback-not-complaint-routing.module';
import { FeedbackNotComplaintComponent } from './feedback-not-complaint.component';


@NgModule({
  declarations: [
    FeedbackNotComplaintComponent
  ],
  imports: [
    SharedPrimeNgModule,
    FeedbackNotComplaintRoutingModule
  ]
})
export class FeedbackNotComplaintModule { }
