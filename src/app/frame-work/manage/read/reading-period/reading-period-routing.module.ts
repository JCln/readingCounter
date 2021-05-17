import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadingPeriodComponent } from './reading-period.component';

const routes: Routes = [
  { path: '', component: ReadingPeriodComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingPeriodRoutingModule { }
