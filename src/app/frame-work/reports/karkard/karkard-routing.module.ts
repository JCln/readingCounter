import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KarkardChartComponent } from './karkard-chart/karkard-chart.component';
import { KarkardComponent } from './karkard.component';

const routes: Routes = [
  {
    path: '', component: KarkardComponent, children: [
      { path: 'chart', component: KarkardChartComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KarkardRoutingModule { }
