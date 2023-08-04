import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'complaint', loadChildren: () => import('./feedback-complaint/feedback-complaint.module').then(feedbackIsComplaint => feedbackIsComplaint.FeedbackComplaintModule) },
  { path: 'notComplaint', loadChildren: () => import('./feedback-not-complaint/feedback-not-complaint.module').then(feedbackIsNotComplaint => feedbackIsNotComplaint.FeedbackNotComplaintModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileManagerRoutingModule { }
