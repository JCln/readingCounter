import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'imd', loadChildren: () => import('./import-dynamic/import-dynamic.module').then(importDynamic => importDynamic.ImportDynamicModule) },
  { path: 'simafa/rdpg', loadChildren: () => import('./simafa-reading-prog/simafa-reading-prog.module').then(simafaReadingProgram => simafaReadingProgram.SimafaReadingProgModule) },
  { path: 'assesspre', loadChildren: () => import('./assess-pre/assess-pre.module').then(assessPre => assessPre.AssessPreModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportDataRoutingModule { }
