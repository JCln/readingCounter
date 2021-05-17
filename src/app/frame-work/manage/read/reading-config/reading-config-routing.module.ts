import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadingConfigComponent } from './reading-config.component';

const routes: Routes = [
  { path: '', component: ReadingConfigComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingConfigRoutingModule { }
