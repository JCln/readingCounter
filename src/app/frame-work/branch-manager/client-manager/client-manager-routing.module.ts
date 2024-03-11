import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientManagerComponent } from './client-manager.component';

const routes: Routes = [
  { path: '', component: ClientManagerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManagerRoutingModule { }
