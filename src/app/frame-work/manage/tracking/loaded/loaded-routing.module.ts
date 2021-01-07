import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoadedComponent } from './loaded.component';

const routes: Routes = [
  { path: '', component: LoadedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadedRoutingModule { }
