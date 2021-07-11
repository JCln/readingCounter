import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./map/map.module').then(mapComponent => mapComponent.MapModule) },
  { path: 'imp', loadChildren: () => import('./import-data/import-data.module').then(importData => importData.ImportDataModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule) },
  { path: 'msge', loadChildren: () => import('./messages/messages.module').then(msge => msge.MessagesModule) },
  { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(pr => pr.PrivacyModule) },
  { path: 'rpts', loadChildren: () => import('./reports/reports.module').then(reports => reports.ReportsModule) },
  { path: 'm', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule) },
  { path: 'mu', loadChildren: () => import('./user-manager/user-manager.module').then(userManager => userManager.UserManagerModule) },
  { path: 'pnf', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'pnf', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameWorkRoutingModule { }
