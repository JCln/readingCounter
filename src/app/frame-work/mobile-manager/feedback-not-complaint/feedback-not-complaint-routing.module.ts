import { FeedbackNotComplaintComponent } from './feedback-not-complaint.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: FeedbackNotComplaintComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackNotComplaintRoutingModule { }
