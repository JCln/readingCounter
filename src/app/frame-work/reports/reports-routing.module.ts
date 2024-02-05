import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'exm/master', loadChildren: () => import('./master/master.module').then(master => master.MasterModule), data: { preload: true } },
  { path: 'exm/details', loadChildren: () => import('./details/details.module').then(details => details.DetailsModule), data: { preload: true } },
  { path: 'exm/paramGuilds', loadChildren: () => import('./guilds-params/guilds-params.module').then(guildsWithParams => guildsWithParams.GuildsParamsModule), data: { preload: true } },
  { path: 'exm/userKarkard', loadChildren: () => import('./user-karkard/user-karkard.module').then(userKarkard => userKarkard.UserKarkardModule), data: { preload: true } },
  { path: 'mam/trv', loadChildren: () => import('./traverse/traverse.module').then(traverse => traverse.TraverseModule), data: { preload: true } },
  { path: 'mam/trvch', loadChildren: () => import('./traverse-differential/traverse-differential.module').then(traverseDiffrential => traverseDiffrential.TraverseDifferentialModule), data: { preload: true } },
  { path: 'mam/karkard', loadChildren: () => import('./karkard/karkard.module').then(karkard => karkard.KarkardModule), data: { preload: true } },
  { path: 'mam/fragment', loadChildren: () => import('./rr-fragment/rr-fragment.module').then(fragment => fragment.RrFragmentModule), data: { preload: true } },
  { path: 'mam/karkardDaily', loadChildren: () => import('./karkard-dayly/karkard-dayly.module').then(karkardDayly => karkardDayly.KarkardDaylyModule), data: { preload: true } },
  { path: 'mam/karkardAllStates', loadChildren: () => import('./karkard-all-states/karkard-all-states.module').then(offloadedKarkardAllStates => offloadedKarkardAllStates.KarkardAllStatesModule), data: { preload: true } },
  { path: 'mam/offkarkard', loadChildren: () => import('./rr-offload-karkard/rr-offload-karkard.module').then(offloadKarkard => offloadKarkard.RrOffloadKarkardModule), data: { preload: true } },
  { path: 'mam/dh', loadChildren: () => import('./disposal-hours/disposal-hours.module').then(disposalHours => disposalHours.DisposalHoursModule), data: { preload: true } },
  { path: 'mam/gis', loadChildren: () => import('./gis/gis.module').then(GIS => GIS.GisModule), data: { preload: true } },
  { path: 'mam/locked', loadChildren: () => import('./rr-locked/rr-locked.module').then(locked => locked.RrLockedModule), data: { preload: true } },
  { path: 'mam/pns', loadChildren: () => import('./rr-pre-number-shown/rr-pre-number-shown.module').then(preNumberShown => preNumberShown.RrPreNumberShownModule), data: { preload: true } },
  { path: 'anlzfile/result', loadChildren: () => import('./image-attr-file-result/image-attr-file-result.module').then(imageAttributionFileResult => imageAttributionFileResult.ImageAttrFileResultModule), data: { preload: true } },
  { path: 'anlzfile/analyze', loadChildren: () => import('./image-attr-file-analyze/image-attr-file-analyze.module').then(imageAttributionFileAnalyze => imageAttributionFileAnalyze.ImageAttrFileAnalyzeModule), data: { preload: true } },
  { path: 'anlz/prfm', loadChildren: () => import('./performance/performance.module').then(analysePerformance => analysePerformance.PerformanceModule), data: { preload: true } },
  { path: 'gallery', loadChildren: () => import('./gallery/gallery.module').then(gallery => gallery.GalleryModule), data: { preload: true } },
  { path: 'inState', loadChildren: () => import('./rr-instate/rr-instate.module').then(inState => inState.RrInstateModule), data: { preload: true } },
  { path: 'exlview', loadChildren: () => import('./rr-excel-dynamic-viewer/rr-excel-dynamic-viewer.module').then(excelDynamicViewer => excelDynamicViewer.RrExcelDynamicViewerModule), data: { preload: true } },
  { path: 'dynamic', loadChildren: () => import('./rr-dynamic-report/rr-dynamic-report.module').then(dynamicReportManager => dynamicReportManager.RrDynamicReportModule), data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
