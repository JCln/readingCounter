import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TraverseDifferentialComponent } from './traverse-differential.component';
import { TrvchChartComponent } from './trvch-chart/trvch-chart.component';

const routes: Routes = [
  {
    path: '', component: TraverseDifferentialComponent, children: [
      { path: 'chart', component: TrvchChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraverseDifferentialRoutingModule { }
