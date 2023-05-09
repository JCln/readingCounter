import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'zs', loadChildren: () => import('./zones/zones.module').then(zones => zones.ZonesModule) },
  { path: 'r', loadChildren: () => import('./read/read.module').then(read => read.ReadModule) },
  { path: 'track', loadChildren: () => import('./tracking/tracking.module').then(trackingManager => trackingManager.TrackingModule) },
  { path: 's', loadChildren: () => import('./search/search.module').then(searchManager => searchManager.SearchModule) },
  { path: 'msge', loadChildren: () => import('./messages/messages.module').then(msge => msge.MessagesModule) },
  { path: 'system', loadChildren: () => import('./system-settings/system-settings.module').then(systemSettings => systemSettings.SystemSettingsModule) },
  { path: 'l', loadChildren: () => import('./list-manager/list-manager.module').then(listManagerModule => listManagerModule.ListManagerModule) },
  { path: 'al', loadChildren: () => import('./authLevels/authlevels.module').then(authLevels => authLevels.AuthlevelsModule) },
  { path: 'dbf', loadChildren: () => import('./dbf-output/dbf-output.module').then(dbf => dbf.DbfOutputModule) },
  { path: 'fbn', loadChildren: () => import('./forbidden/forbidden.module').then(forbidden => forbidden.ForbiddenModule) },
  { path: 'dma', loadChildren: () => import('./data-mining/data-mining.module').then(dataMining => dataMining.DataMiningModule) },
  { path: 'dbfEB', loadChildren: () => import('./dbf-output-eqamat-bagh/dbf-output-eqamat-bagh.module').then(dbfOutputEqamatBagh => dbfOutputEqamatBagh.DbfOutputEqamatBaghModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }



