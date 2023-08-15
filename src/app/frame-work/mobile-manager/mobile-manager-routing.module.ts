import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'complaint', loadChildren: () => import('./feedback-complaint/feedback-complaint.module').then(feedbackIsComplaint => feedbackIsComplaint.FeedbackComplaintModule) },
  { path: 'suggest', loadChildren: () => import('./feedback-not-complaint/feedback-not-complaint.module').then(feedbackIsNotComplaint => feedbackIsNotComplaint.FeedbackNotComplaintModule) },
  { path: 'listC', loadChildren: () => import('./feedback-all/feedback-all.module').then(feedbackAllComplaint => feedbackAllComplaint.FeedbackAllModule) },
  { path: 'listS', loadChildren: () => import('./feedback-all-s/feedback-all-s.module').then(feedbackAllSuggests => feedbackAllSuggests.FeedbackAllSModule) },
  { path: 'fbnType', loadChildren: () => import('./forbidden-with-type/forbidden-with-type.module').then(forbiddenByParamWithType => forbiddenByParamWithType.ForbiddenWithTypeModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileManagerRoutingModule { }
