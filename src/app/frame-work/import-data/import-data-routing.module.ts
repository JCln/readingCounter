import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'imd', loadChildren: () => import('./import-dynamic/import-dynamic.module').then(importDynamic => importDynamic.ImportDynamicModule) },
  { path: 'simafa/batch', loadChildren: () => import('./simafa-batch/simafa-batch.module').then(simafaBatch => simafaBatch.SimafaBatchModule) },
  { path: 'simafa/rdpg', loadChildren: () => import('./simafa-reading-prog/simafa-reading-prog.module').then(simafaReadingProgram => simafaReadingProgram.SimafaReadingProgModule) },
  { path: 'assesspre', loadChildren: () => import('./assess-pre/assess-pre.module').then(assessPre => assessPre.AssessPreModule) },
  { path: 'assessadd', loadChildren: () => import('./assess-add/assess-add.module').then(assessADD => assessADD.AssessAddModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportDataRoutingModule { }
