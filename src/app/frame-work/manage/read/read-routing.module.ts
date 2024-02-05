import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'rp', loadChildren: () => import('./reading-period/reading-period.module').then(readingPeriodManager => readingPeriodManager.ReadingPeriodModule), data: { preload: true } },
  { path: 'rpk', loadChildren: () => import('./reading-period-kind/reading-period-kind.module').then(readingPeriodKindManager => readingPeriodKindManager.ReadingPeriodKindModule), data: { preload: true } },
  { path: 'rpt', loadChildren: () => import('./counter-report/counter-report.module').then(counterReport => counterReport.CounterReportModule), data: { preload: true } },
  { path: 'apk', loadChildren: () => import('./apk/apk.module').then(apk => apk.ApkModule), data: { preload: true } },
  { path: 'cs', loadChildren: () => import('./counter-state/counter-state.module').then(counterState => counterState.CounterStateModule), data: { preload: true } },
  { path: 'rcd', loadChildren: () => import('./reading-config/reading-config.module').then(readingConfig => readingConfig.ReadingConfigModule), data: { preload: true } },
  { path: 'qtr', loadChildren: () => import('./qotr/qotr.module').then(qotr => qotr.QotrModule), data: { preload: true } },
  { path: 'kar', loadChildren: () => import('./karbari/karbari.module').then(karbari => karbari.KarbariModule), data: { preload: true } },
  { path: 'txt', loadChildren: () => import('./text/text.module').then(textOutput => textOutput.TextModule), data: { preload: true } },
  { path: 'nob', loadChildren: () => import('./fragment/fragment.module').then(fragmentNob => fragmentNob.FragmentModule), data: { preload: true } },
  { path: 'formula', loadChildren: () => import('./formula/formula.module').then(formula => formula.FormulaModule), data: { preload: true } },
  { path: 'imgattr', loadChildren: () => import('./image-attribution/image-attribution.module').then(imageAttribution => imageAttribution.ImageAttributionModule), data: { preload: true } },
  { path: 'guild', loadChildren: () => import('./guild/guild.module').then(guildManager => guildManager.GuildModule), data: { preload: true } },
  { path: 'dynamicTrv', loadChildren: () => import('./dynamic-traverse/dynamic-traverse.module').then(dynamicTraverse => dynamicTraverse.DynamicTraverseModule), data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadRoutingModule { }
