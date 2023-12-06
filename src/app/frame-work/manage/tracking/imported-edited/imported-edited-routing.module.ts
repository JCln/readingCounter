import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportedEditedComponent } from './imported-edited.component';

const routes: Routes = [
  { path: '', component: ImportedEditedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportedEditedRoutingModule { }
