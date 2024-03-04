import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./map/map.module').then(mapComponent => mapComponent.MapModule) },
  { path: 'imp', loadChildren: () => import('./import-data/import-data.module').then(importData => importData.ImportDataModule), data: { preload: true } },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(settings => settings.SettingsModule), data: { preload: true } },
  { path: 'rpts', loadChildren: () => import('./reports/reports.module').then(reports => reports.ReportsModule), data: { preload: true } },
  { path: 'm', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule), data: { preload: true } },
  { path: 'mu', loadChildren: () => import('./user-manager/user-manager.module').then(userManager => userManager.UserManagerModule), data: { preload: true } },
  { path: 'tools', loadChildren: () => import('./tools/tools.module').then(tools => tools.ToolsModule), data: { preload: true } },
  { path: 'offline', loadChildren: () => import('./offline-mode/offline-mode.module').then(offlineMode => offlineMode.OfflineModeModule) },
  { path: 'flash', loadChildren: () => import('./moment-system/moment-system.module').then(momentSystem => momentSystem.MomentSystemModule) },
  { path: 'reqLog', loadChildren: () => import('./request-log/request-log.module').then(requestLog => requestLog.RequestLogModule) },
  { path: 'app', loadChildren: () => import('./mobile-manager/mobile-manager.module').then(mobileManager => mobileManager.MobileManagerModule) },
  { path: 'branch', loadChildren: () => import('./branch-manager/branch-manager.module').then(branchManager => branchManager.BranchManagerModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameWorkRoutingModule { }
