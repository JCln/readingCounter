import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'rp', loadChildren: () => import('./reading-period/reading-period.module').then(readingPeriodManager => readingPeriodManager.ReadingPeriodModule) },
  { path: 'rpk', loadChildren: () => import('./reading-period-kind/reading-period-kind.module').then(readingPeriodKindManager => readingPeriodKindManager.ReadingPeriodKindModule) },
  { path: 'rpt', loadChildren: () => import('./counter-report/counter-report.module').then(counterReport => counterReport.CounterReportModule) },
  { path: 'apk', loadChildren: () => import('./apk/apk.module').then(apk => apk.ApkModule) },
  { path: 'cs', loadChildren: () => import('./counter-state/counter-state.module').then(counterState => counterState.CounterStateModule) },
  { path: 'rcd', loadChildren: () => import('./reading-config/reading-config.module').then(readingConfig => readingConfig.ReadingConfigModule) },
  { path: 'qtr', loadChildren: () => import('./qotr/qotr.module').then(qotr => qotr.QotrModule) },
  { path: 'kar', loadChildren: () => import('./karbari/karbari.module').then(karbari => karbari.KarbariModule) },
  { path: 'txt', loadChildren: () => import('./text/text.module').then(textOutput => textOutput.TextModule) },
  { path: 'nob', loadChildren: () => import('./fragment/fragment.module').then(fragmentNob => fragmentNob.FragmentModule) },
  { path: 'formula', loadChildren: () => import('./formula/formula.module').then(formula => formula.FormulaModule) },
  { path: 'imgattr', loadChildren: () => import('./image-attribution/image-attribution.module').then(imageAttribution => imageAttribution.ImageAttributionModule) },
  { path: 'guild', loadChildren: () => import('./guild/guild.module').then(guildManager => guildManager.GuildModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadRoutingModule { }
