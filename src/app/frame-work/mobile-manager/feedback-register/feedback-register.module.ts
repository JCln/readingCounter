import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRegisterRoutingModule } from './feedback-register-routing.module';
import { FeedbackRegisterComponent } from './feedback-register.component';


@NgModule({
  declarations: [
    FeedbackRegisterComponent
  ],
  imports: [
    CommonModule,
    FeedbackRegisterRoutingModule
  ]
})
export class FeedbackRegisterModule { }
