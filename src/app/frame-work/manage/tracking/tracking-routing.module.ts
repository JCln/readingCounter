import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'fwu', loadChildren: () => import('./follow-up/follow-up.module').then(followUp => followUp.FollowUpModule) },
  { path: 'imported', loadChildren: () => import('./imported/imported.module').then(imported => imported.ImportedModule) },
  { path: 'loaded', loadChildren: () => import('./loaded/loaded.module').then(loaded => loaded.LoadedModule) },
  { path: 'reading', loadChildren: () => import('./reading/reading.module').then(reading => reading.ReadingModule) },
  { path: 'offloaded', loadChildren: () => import('./offloaded/offloaded.module').then(offloaded => offloaded.OffloadedModule) },
  { path: 'finished', loadChildren: () => import('./finished/finished.module').then(finished => finished.FinishedModule) },
  { path: 'woui/:id', loadChildren: () => import('./ab-dan-uploaded-info/ab-dan-uploaded-info.module').then(waterOfficerUploadedInfo => waterOfficerUploadedInfo.AbDanUploadedInfoModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
