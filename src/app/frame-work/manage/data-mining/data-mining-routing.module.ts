import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'cranlz', loadChildren: () => import('./dm-analysis/dm-analysis.module').then(dataMiningAnalysis => dataMiningAnalysis.DmAnalysisModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataMiningRoutingModule { }
