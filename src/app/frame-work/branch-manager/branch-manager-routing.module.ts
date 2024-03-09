import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'state', loadChildren: () => import('./state/state.module').then(state => state.StateModule) },
  { path: 'customerType', loadChildren: () => import('./customer-type/customer-type.module').then(customerType => customerType.CustomerTypeModule) },
  { path: 'waterSource', loadChildren: () => import('./water-source/water-source.module').then(waterSource => waterSource.WaterSourceModule) },
  { path: 'ownershipType', loadChildren: () => import('./ownership-type/ownership-type.module').then(ownershipType => ownershipType.OwnershipTypeModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchManagerRoutingModule { }
