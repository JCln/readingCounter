import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RrLockedComponent } from './rr-locked.component';

const routes: Routes = [
  { path: '', component: RrLockedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrLockedRoutingModule { }
