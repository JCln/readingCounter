import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { NgModule } from '@angular/core';

import { FeedbackComplaintRoutingModule } from './feedback-complaint-routing.module';
import { FeedbackComplaintComponent } from './feedback-complaint.component';


@NgModule({
  declarations: [
    FeedbackComplaintComponent
  ],
  imports: [
    SharedPrimeNgModule,
    FeedbackComplaintRoutingModule
  ]
})
export class FeedbackComplaintModule { }
