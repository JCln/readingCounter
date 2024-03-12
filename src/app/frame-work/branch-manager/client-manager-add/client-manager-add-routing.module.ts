import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientManagerAddComponent } from './client-manager-add.component';

const routes: Routes = [
  { path: '', component: ClientManagerAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManagerAddRoutingModule { }
