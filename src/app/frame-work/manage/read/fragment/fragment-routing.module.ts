import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FragmentComponent } from './fragment.component';

const routes: Routes = [
  { path: '', component: FragmentComponent },
  { path: 'autoImport', loadChildren: () => import('./automatic-import/automatic-import.module').then(automaticImport => automaticImport.AutomaticImportModule) },
  { path: 'detail', loadChildren: () => import('./fragment-details/fragment-details.module').then(fragmentDetails => fragmentDetails.FragmentDetailsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FragmentRoutingModule { }
