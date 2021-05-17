import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadingPeriodKindComponent } from './reading-period-kind.component';

const routes: Routes = [
  { path: '', component: ReadingPeriodKindComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingPeriodKindRoutingModule { }
