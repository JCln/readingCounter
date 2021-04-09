import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Auth3Component } from './auth3.component';

const routes: Routes = [
  { path: '', component: Auth3Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Auth3RoutingModule { }
