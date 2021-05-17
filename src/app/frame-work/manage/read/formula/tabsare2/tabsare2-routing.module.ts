import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Tabsare2Component } from './tabsare2.component';

const routes: Routes = [
  { path: '', component: Tabsare2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tabsare2RoutingModule { }
