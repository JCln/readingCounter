import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsResComponent } from './details-res/details-res.component';
import { DetailsComponent } from './details.component';

const routes: Routes = [
  {
    path: '', component: DetailsComponent, children: [
      { path: 'res', component: DetailsResComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
