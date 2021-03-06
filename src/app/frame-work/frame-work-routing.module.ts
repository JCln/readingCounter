import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./map/map.module').then(mapComponent => mapComponent.MapModule) },
  { path: 'imp', loadChildren: () => import('./import-data/import-data.module').then(importData => importData.ImportDataModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule) },
  { path: 'rpts', loadChildren: () => import('./reports/reports.module').then(reports => reports.ReportsModule) },
  { path: 'm', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule) },
  { path: 'mu', loadChildren: () => import('./user-manager/user-manager.module').then(userManager => userManager.UserManagerModule) },
  { path: 'tools', loadChildren: () => import('./tools/tools.module').then(tools => tools.ToolsModule) },
  { path: 'offline', loadChildren: () => import('./offline-mode/offline-mode.module').then(offlineMode => offlineMode.OfflineModeModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameWorkRoutingModule { }
