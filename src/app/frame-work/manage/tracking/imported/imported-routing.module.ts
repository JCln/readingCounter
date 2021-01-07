import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImportedComponent } from './imported.component';

const routes: Routes = [
  { path: '', component: ImportedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportedRoutingModule { }
