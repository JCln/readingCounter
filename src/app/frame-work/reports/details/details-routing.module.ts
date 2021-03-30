import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterResComponent } from './../master/master-res/master-res.component';
import { DetailsComponent } from './details.component';

const routes: Routes = [
  {
    path: '', component: DetailsComponent, children: [
      { path: '', component: MasterResComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
