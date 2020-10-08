import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseInfoComponent } from './base-info.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '', component: BaseInfoComponent, children: [
      { path: 'details', component: DetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseInfoRoutingModule { }
