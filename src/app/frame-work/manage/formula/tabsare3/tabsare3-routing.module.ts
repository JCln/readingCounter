import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Tabsare3Component } from './tabsare3.component';

const routes: Routes = [
  { path: '', component: Tabsare3Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tabsare3RoutingModule { }
