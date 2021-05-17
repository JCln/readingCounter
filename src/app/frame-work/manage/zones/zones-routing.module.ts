import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'c', loadChildren: () => import('./country/country.module').then(mc => mc.CountryModule) },
  { path: 'p', loadChildren: () => import('./province/province.module').then(mp => mp.ProvinceModule) },
  { path: 'r', loadChildren: () => import('./region/region.module').then(mr => mr.RegionModule) },
  { path: 'z', loadChildren: () => import('./zone/zone.module').then(mz => mz.ZoneModule) },
  { path: 'zb', loadChildren: () => import('./zone-bound/zone-bound.module').then(mzd => mzd.ZoneBoundModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonesRoutingModule { }
