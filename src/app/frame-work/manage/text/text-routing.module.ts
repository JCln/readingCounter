import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'out', loadChildren: () => import('./txt-output/txt-output.module').then(txtOutput => txtOutput.TxtOutputModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextRoutingModule { }
