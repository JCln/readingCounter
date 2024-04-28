import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TariffManagerComponent } from './tariff-manager.component';

const routes: Routes = [
  { path: '', component: TariffManagerComponent },
  { path: 'excelToFill', loadChildren: () => import('./excel-to-fill/excel-to-fill.module').then(ExcelToFill => ExcelToFill.ExcelToFillModule) },
  { path: 'calculation', loadChildren: () => import('./calculation/calculation.module').then(calculation => calculation.CalculationModule) },
  { path: 'allLazy', loadChildren: () => import('./tariff-all-lazy/tariff-all-lazy.module').then(tariffAllLazy => tariffAllLazy.TariffAllLazyModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TariffManagerRoutingModule { }
