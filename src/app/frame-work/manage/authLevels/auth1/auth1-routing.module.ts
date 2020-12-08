import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Auth1Component } from './auth1.component';

const routes: Routes = [
  { path: '', component: Auth1Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Auth1RoutingModule { }
