import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TraverseResComponent } from './traverse-res/traverse-res.component';
import { TraverseComponent } from './traverse.component';

const routes: Routes = [
  {
    path: '', component: TraverseComponent, children: [
      { path: 'res', component: TraverseResComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraverseRoutingModule { }
