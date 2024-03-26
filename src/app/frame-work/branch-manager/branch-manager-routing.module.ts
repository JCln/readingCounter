import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'state', loadChildren: () => import('./state/state.module').then(state => state.StateModule) },
  { path: 'customerType', loadChildren: () => import('./customer-type/customer-type.module').then(customerType => customerType.CustomerTypeModule) },
  { path: 'waterSource', loadChildren: () => import('./water-source/water-source.module').then(waterSource => waterSource.WaterSourceModule) },
  { path: 'ownershipType', loadChildren: () => import('./ownership-type/ownership-type.module').then(ownershipType => ownershipType.OwnershipTypeModule) },
  { path: 'clients', loadChildren: () => import('./client-manager/client-manager.module').then(clientManagerGet => clientManagerGet.ClientManagerModule) },
  { path: 'addClients', loadChildren: () => import('./client-manager-add/client-manager-add.module').then(addClientManager => addClientManager.ClientManagerAddModule) },
  { path: 'clientLazy', loadChildren: () => import('./client-get-lazy/client-get-lazy.module').then(clientGetLazy => clientGetLazy.ClientGetLazyModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchManagerRoutingModule { }
