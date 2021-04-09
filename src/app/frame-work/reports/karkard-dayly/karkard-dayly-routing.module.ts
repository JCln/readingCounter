import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KarkardDaylyResComponent } from './karkard-dayly-res/karkard-dayly-res.component';
import { KarkardDaylyComponent } from './karkard-dayly.component';

const routes: Routes = [
  {
    path: '', component: KarkardDaylyComponent, children: [
      { path: 'res', component: KarkardDaylyResComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KarkardDaylyRoutingModule { }
