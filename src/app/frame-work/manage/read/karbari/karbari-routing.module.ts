import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KarbariComponent } from './karbari.component';

const routes: Routes = [
  { path: '', component: KarbariComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KarbariRoutingModule { }
