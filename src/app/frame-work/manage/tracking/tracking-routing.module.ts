import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'imported', loadChildren: () => import('./imported/imported.module').then(imported => imported.ImportedModule) },
  { path: 'importedEdited', loadChildren: () => import('./imported-edited/imported-edited.module').then(importedEdited => importedEdited.ImportedEditedModule) },
  { path: 'loaded', loadChildren: () => import('./loaded/loaded.module').then(loaded => loaded.LoadedModule) },
  { path: 'reading', loadChildren: () => import('./reading/reading.module').then(reading => reading.ReadingModule) },
  { path: 'offloaded', loadChildren: () => import('./offloaded/offloaded.module').then(offloaded => offloaded.OffloadedModule) },
  { path: 'offloadedG', loadChildren: () => import('./offloaded-group/offloaded-group.module').then(offloadedGrouped => offloadedGrouped.OffloadedGroupModule) },
  { path: 'finished', loadChildren: () => import('./finished/finished.module').then(finished => finished.FinishedModule) },
  { path: 'latest', loadChildren: () => import('./last-states/last-states.module').then(lastStates => lastStates.LastStatesModule) },
  { path: 'userSummary', loadChildren: () => import('./user-karkard-summary/user-karkard-summary.module').then(userKarkardSummary => userKarkardSummary.UserKarkardSummaryModule) },
  { path: 'offMaster', loadChildren: () => import('./offloaded-master/offloaded-master.module').then(offloadedMaster => offloadedMaster.OffloadedMasterModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
