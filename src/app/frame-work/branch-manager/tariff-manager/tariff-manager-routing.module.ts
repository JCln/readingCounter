import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TariffManagerComponent } from './tariff-manager.component';

const routes: Routes = [
  { path: '', component: TariffManagerComponent },
  { path: 'excelToFill', loadChildren: () => import('./excel-to-fill/excel-to-fill.module').then(ExcelToFill => ExcelToFill.ExcelToFillModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TariffManagerRoutingModule { }
