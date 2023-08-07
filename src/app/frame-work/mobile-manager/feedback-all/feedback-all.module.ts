import { NgModule } from '@angular/core';

import { FeedbackAllRoutingModule } from './feedback-all-routing.module';
import { FeedbackAllComponent } from './feedback-all.component';
import { SharedThreeModule } from 'src/app/shared/shared_three.module';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    FeedbackAllComponent
  ],
  imports: [
    SharedThreeModule,
    SharedPrimeNgModule,
    FeedbackAllRoutingModule
  ]
})
export class FeedbackAllModule { }
