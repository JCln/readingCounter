import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'exm/master', loadChildren: () => import('./master/master.module').then(master => master.MasterModule) },
  { path: 'exm/details', loadChildren: () => import('./details/details.module').then(details => details.DetailsModule) },
  { path: 'mam/trv', loadChildren: () => import('./traverse/traverse.module').then(traverse => traverse.TraverseModule) },
  { path: 'mam/trvch', loadChildren: () => import('./traverse-differential/traverse-differential.module').then(traverseDiffrential => traverseDiffrential.TraverseDifferentialModule) },
  { path: 'mam/karkard', loadChildren: () => import('./karkard/karkard.module').then(karkard => karkard.KarkardModule) },
  { path: 'mam/karkardDaily', loadChildren: () => import('./karkard-dayly/karkard-dayly.module').then(karkardDayly => karkardDayly.KarkardDaylyModule) },
  { path: 'mam/offkarkard', loadChildren: () => import('./rr-offload-karkard/rr-offload-karkard.module').then(offloadKarkard => offloadKarkard.RrOffloadKarkardModule) },
  { path: 'mam/dh', loadChildren: () => import('./disposal-hours/disposal-hours.module').then(disposalHours => disposalHours.DisposalHoursModule) },
  // { path: 'mam/locked', loadChildren: () => import('./disposal-hours/disposal-hours.module').then(disposalHours => disposalHours.DisposalHoursModule) },
  // { path: 'mam/preNumber', loadChildren: () => import('./disposal-hours/disposal-hours.module').then(disposalHours => disposalHours.DisposalHoursModule) },
  { path: 'mam/gis', loadChildren: () => import('./gis/gis.module').then(GIS => GIS.GisModule) },
  { path: 'anlz/prfm', loadChildren: () => import('./performance/performance.module').then(analysePerformance => analysePerformance.PerformanceModule) },
  { path: 'gallery', loadChildren: () => import('./gallery/gallery.module').then(gallery => gallery.GalleryModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
