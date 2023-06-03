import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServerOsInfoComponent } from './server-os-info.component';

const routes: Routes = [
  { path: '', component: ServerOsInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerOsInfoRoutingModule { }
