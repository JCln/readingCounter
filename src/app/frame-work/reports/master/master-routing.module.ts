import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterResComponent } from './master-res/master-res.component';
import { MasterComponent } from './master.component';

const routes: Routes = [
  {
    path: '', component: MasterComponent, children: [
      { path: 'res', component: MasterResComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
