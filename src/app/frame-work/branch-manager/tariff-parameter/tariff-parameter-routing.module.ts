import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TariffParameterComponent } from './tariff-parameter.component';

const routes: Routes = [
  { path: '', component: TariffParameterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TariffParameterRoutingModule { }
