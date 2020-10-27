import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Auth4Component } from './auth4.component';

const routes: Routes = [
  { path: '', component: Auth4Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Auth4RoutingModule { }
