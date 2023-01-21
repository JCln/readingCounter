import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'exm/master', loadChildren: () => import('./master/master.module').then(master => master.MasterModule) },
  { path: 'exm/details', loadChildren: () => import('./details/details.module').then(details => details.DetailsModule) },
  { path: 'exm/userKarkard', loadChildren: () => import('./user-karkard/user-karkard.module').then(userKarkard => userKarkard.UserKarkardModule) },
  { path: 'mam/trv', loadChildren: () => import('./traverse/traverse.module').then(traverse => traverse.TraverseModule) },
  { path: 'mam/trvch', loadChildren: () => import('./traverse-differential/traverse-differential.module').then(traverseDiffrential => traverseDiffrential.TraverseDifferentialModule) },
  { path: 'mam/karkard', loadChildren: () => import('./karkard/karkard.module').then(karkard => karkard.KarkardModule) },
  { path: 'mam/fragment', loadChildren: () => import('./rr-fragment/rr-fragment.module').then(fragment => fragment.RrFragmentModule) },
  { path: 'mam/karkardDaily', loadChildren: () => import('./karkard-dayly/karkard-dayly.module').then(karkardDayly => karkardDayly.KarkardDaylyModule) },
  { path: 'mam/karkardAllStates', loadChildren: () => import('./karkard-all-states/karkard-all-states.module').then(offloadedKarkardAllStates => offloadedKarkardAllStates.KarkardAllStatesModule) },
  { path: 'mam/offkarkard', loadChildren: () => import('./rr-offload-karkard/rr-offload-karkard.module').then(offloadKarkard => offloadKarkard.RrOffloadKarkardModule) },
  { path: 'mam/dh', loadChildren: () => import('./disposal-hours/disposal-hours.module').then(disposalHours => disposalHours.DisposalHoursModule) },
  { path: 'mam/gis', loadChildren: () => import('./gis/gis.module').then(GIS => GIS.GisModule) },
  { path: 'mam/locked', loadChildren: () => import('./rr-locked/rr-locked.module').then(locked => locked.RrLockedModule) },
  { path: 'mam/pns', loadChildren: () => import('./rr-pre-number-shown/rr-pre-number-shown.module').then(preNumberShown => preNumberShown.RrPreNumberShownModule) },
  { path: 'anlzfile/result', loadChildren: () => import('./image-attr-file-result/image-attr-file-result.module').then(imageAttributionFileResult => imageAttributionFileResult.ImageAttrFileResultModule) },
  { path: 'anlzfile/analyze', loadChildren: () => import('./image-attr-file-analyze/image-attr-file-analyze.module').then(imageAttributionFileAnalyze => imageAttributionFileAnalyze.ImageAttrFileAnalyzeModule) },
  { path: 'anlz/prfm', loadChildren: () => import('./performance/performance.module').then(analysePerformance => analysePerformance.PerformanceModule) },
  { path: 'gallery', loadChildren: () => import('./gallery/gallery.module').then(gallery => gallery.GalleryModule) },
  { path: 'inState', loadChildren: () => import('./rr-instate/rr-instate.module').then(inState => inState.RrInstateModule) },
  { path: 'exlview', loadChildren: () => import('./rr-excel-dynamic-viewer/rr-excel-dynamic-viewer.module').then(excelDynamicViewer => excelDynamicViewer.RrExcelDynamicViewerModule) },
  { path: 'dynamic', loadChildren: () => import('./rr-dynamic-report/rr-dynamic-report.module').then(dynamicReportManager => dynamicReportManager.RrDynamicReportModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
