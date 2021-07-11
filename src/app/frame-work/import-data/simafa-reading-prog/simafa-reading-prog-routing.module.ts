import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimafaReadingProgComponent } from './simafa-reading-prog.component';

const routes: Routes = [
  { path: '', component: SimafaReadingProgComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimafaReadingProgRoutingModule { }
