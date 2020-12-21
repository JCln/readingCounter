import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ms', loadChildren: () => import('./manage-server/manage-server.module').then(ms => ms.ManageServerModule) },
  { path: 'mc', loadChildren: () => import('./country/country.module').then(mc => mc.CountryModule) },
  { path: 'mp', loadChildren: () => import('./province/province.module').then(mp => mp.ProvinceModule) },
  { path: 'mr', loadChildren: () => import('./region/region.module').then(mr => mr.RegionModule) },
  { path: 'mz', loadChildren: () => import('./zone/zone.module').then(mz => mz.ZoneModule) },
  { path: 'rpm', loadChildren: () => import('./reading-period/reading-period.module').then(readingPeriodManager => readingPeriodManager.ReadingPeriodModule) },
  { path: 'rpkm', loadChildren: () => import('./reading-period-kind/reading-period-kind.module').then(readingPeriodKindManager => readingPeriodKindManager.ReadingPeriodKindModule) },
  { path: 'mrm', loadChildren: () => import('./role-manager/role-manager.module').then(mrm => mrm.RoleManagerModule) },
  { path: 'mzd', loadChildren: () => import('./zone-bound/zone-bound.module').then(mzd => mzd.ZoneBoundModule) },
  { path: 'kar', loadChildren: () => import('./karbari/karbari.module').then(karbari => karbari.KarbariModule) },
  { path: 'cs', loadChildren: () => import('./counter-state/counter-state.module').then(counterState => counterState.CounterStateModule) },
  { path: 'rcd', loadChildren: () => import('./reading-config/reading-config.module').then(readingConfig => readingConfig.ReadingConfigModule) },
  { path: 'al', loadChildren: () => import('./authLevels/authlevels.module').then(authLevels => authLevels.AuthlevelsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }



