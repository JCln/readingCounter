import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TariffAllLazyComponent } from './tariff-all-lazy.component';

const routes: Routes = [
  { path: '', component: TariffAllLazyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TariffAllLazyRoutingModule { }
