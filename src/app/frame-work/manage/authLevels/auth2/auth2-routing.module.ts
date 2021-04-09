import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Auth2Component } from './auth2.component';

const routes: Routes = [
  { path: '', component: Auth2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Auth2RoutingModule { }
