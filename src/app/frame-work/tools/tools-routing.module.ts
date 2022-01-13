import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'randomImg', loadChildren: () => import('./random-images/random-images.module').then(randomImages => randomImages.RandomImagesModule) },
  { path: 'excelBuild', loadChildren: () => import('./excel-builder/excel-builder.module').then(excelBuilder => excelBuilder.ExcelBuilderModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
