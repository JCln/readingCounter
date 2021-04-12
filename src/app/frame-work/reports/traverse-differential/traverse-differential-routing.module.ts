import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TraverseDifferentialComponent } from './traverse-differential.component';
import { TrvchChartComponent } from './trvch-chart/trvch-chart.component';
import { TrvchResComponent } from './trvch-res/trvch-res.component';

const routes: Routes = [
  {
    path: '', component: TraverseDifferentialComponent, children: [
      { path: 'res', component: TrvchResComponent },
      { path: 'chart', component: TrvchChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraverseDifferentialRoutingModule { }
