import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'imd', loadChildren: () => import('./import-dynamic/import-dynamic.module').then(importDynamic => importDynamic.ImportDynamicModule) },
  { path: 'batch', loadChildren: () => import('./simafa-batch/simafa-batch.module').then(simafaBatch => simafaBatch.SimafaBatchModule) },
  { path: 'readProg', loadChildren: () => import('./simafa-reading-prog/simafa-reading-prog.module').then(simafaReadingProgram => simafaReadingProgram.SimafaReadingProgModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportDataRoutingModule { }
