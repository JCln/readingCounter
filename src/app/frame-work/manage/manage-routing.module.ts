import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ms', loadChildren: () => import('./manage-server/manage-server.module').then(ms => ms.ManageServerModule) },
  { path: 'mc', loadChildren: () => import('./country/country.module').then(mc => mc.CountryModule) },
  { path: 'mp', loadChildren: () => import('./province/province.module').then(mp => mp.ProvinceModule) },
  { path: 'mr', loadChildren: () => import('./region/region.module').then(mr => mr.RegionModule) },
  { path: 'mz', loadChildren: () => import('./zone/zone.module').then(mz => mz.ZoneModule) },
  { path: 'rp', loadChildren: () => import('./reading-period/reading-period.module').then(readingPeriodManager => readingPeriodManager.ReadingPeriodModule) },
  { path: 'rpk', loadChildren: () => import('./reading-period-kind/reading-period-kind.module').then(readingPeriodKindManager => readingPeriodKindManager.ReadingPeriodKindModule) },
  { path: 'qr', loadChildren: () => import('./qotr/qotr.module').then(qotr => qotr.QotrModule) },
  { path: 'cr', loadChildren: () => import('./counter-report/counter-report.module').then(counterReport => counterReport.CounterReportModule) },
  { path: 'mrm', loadChildren: () => import('./role-manager/role-manager.module').then(mrm => mrm.RoleManagerModule) },
  { path: 'mzd', loadChildren: () => import('./zone-bound/zone-bound.module').then(mzd => mzd.ZoneBoundModule) },
  { path: 'kar', loadChildren: () => import('./karbari/karbari.module').then(karbari => karbari.KarbariModule) },
  { path: 'cs', loadChildren: () => import('./counter-state/counter-state.module').then(counterState => counterState.CounterStateModule) },
  { path: 'rcd', loadChildren: () => import('./reading-config/reading-config.module').then(readingConfig => readingConfig.ReadingConfigModule) },
  { path: 'track', loadChildren: () => import('./tracking/tracking.module').then(trackingManager => trackingManager.TrackingModule) },
  { path: 'l', loadChildren: () => import('./list-manager/list-manager.module').then(listManagerModule => listManagerModule.ListManagerModule) },
  { path: 'al', loadChildren: () => import('./authLevels/authlevels.module').then(authLevels => authLevels.AuthlevelsModule) },
  { path: 'dbf', loadChildren: () => import('./dbf-output/dbf-output.module').then(dbf => dbf.DbfOutputModule) },
  { path: 'fbn', loadChildren: () => import('./forbidden/forbidden.module').then(forbidden => forbidden.ForbiddenModule) },
  { path: 'nob', loadChildren: () => import('./fragment/fragment.module').then(fragmentNob => fragmentNob.FragmentModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }



