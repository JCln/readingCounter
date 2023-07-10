import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RrPreNumberShownComponent } from './rr-pre-number-shown.component';

const routes: Routes = [
  { path: '', component: RrPreNumberShownComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrPreNumberShownRoutingModule { }
