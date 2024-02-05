import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'imported', loadChildren: () => import('./imported/imported.module').then(imported => imported.ImportedModule), data: { preload: true } },
  { path: 'importedEdited', loadChildren: () => import('./imported-edited/imported-edited.module').then(importedEdited => importedEdited.ImportedEditedModule), data: { preload: true } },
  { path: 'loaded', loadChildren: () => import('./loaded/loaded.module').then(loaded => loaded.LoadedModule), data: { preload: true } },
  { path: 'reading', loadChildren: () => import('./reading/reading.module').then(reading => reading.ReadingModule), data: { preload: true } },
  { path: 'offloaded', loadChildren: () => import('./offloaded/offloaded.module').then(offloaded => offloaded.OffloadedModule), data: { preload: true } },
  { path: 'offloadedG', loadChildren: () => import('./offloaded-group/offloaded-group.module').then(offloadedGrouped => offloadedGrouped.OffloadedGroupModule), data: { preload: true } },
  { path: 'finished', loadChildren: () => import('./finished/finished.module').then(finished => finished.FinishedModule), data: { preload: true } },
  { path: 'latest', loadChildren: () => import('./last-states/last-states.module').then(lastStates => lastStates.LastStatesModule), data: { preload: true } },
  { path: 'userSummary', loadChildren: () => import('./user-karkard-summary/user-karkard-summary.module').then(userKarkardSummary => userKarkardSummary.UserKarkardSummaryModule), data: { preload: true } },
  { path: 'offMaster', loadChildren: () => import('./offloaded-master/offloaded-master.module').then(offloadedMaster => offloadedMaster.OffloadedMasterModule), data: { preload: true } },
  { path: 'simpleMaster', loadChildren: () => import('./simple-master-by-fragment/simple-master-by-fragment.module').then(simpleMasterByFragment => simpleMasterByFragment.SimpleMasterByFragmentModule), data: { preload: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
