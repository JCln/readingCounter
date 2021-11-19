import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisperseChartComponent } from './disperse-chart/disperse-chart.component';
import { DisposalHoursComponent } from './disposal-hours.component';

const routes: Routes = [
  {
    path: '', component: DisposalHoursComponent, children: [      
      { path: 'chart', component: DisperseChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisposalHoursRoutingModule { }
