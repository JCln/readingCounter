import { FeedbackAllSComponent } from './feedback-all-s.component';
import { NgModule } from '@angular/core';

import { FeedbackAllSRoutingModule } from './feedback-all-s-routing.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';

@NgModule({
  declarations: [FeedbackAllSComponent],
  imports: [
    SharedThreeModule,
    SharedPrimeNgModule,
    FeedbackAllSRoutingModule
  ]
})
export class FeedbackAllSModule { }
