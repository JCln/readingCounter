import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServerErrorsComponent } from './server-errors.component';

const routes: Routes = [
  { path: '', component: ServerErrorsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerErrorsRoutingModule { }
