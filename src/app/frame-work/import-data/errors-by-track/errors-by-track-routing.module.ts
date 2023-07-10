import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorsByTrackComponent } from './errors-by-track.component';

const routes: Routes = [
  { path: '', component: ErrorsByTrackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsByTrackRoutingModule { }
