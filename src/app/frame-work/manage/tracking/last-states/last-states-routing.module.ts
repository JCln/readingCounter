import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LastStatesComponent } from './last-states.component';

const routes: Routes = [
  { path: '', component: LastStatesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LastStatesRoutingModule { }
