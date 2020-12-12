import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './map/dashboard/dashboard.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: '', component: MapComponent, children: [
      { path: 'db', component: DashboardComponent }
    ]
  },
  { path: 'imd', loadChildren: () => import('./import-dynamic/import-dynamic.module').then(importDynamicDto => importDynamicDto.ImportDynamicModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule) },
  { path: 'apk', loadChildren: () => import('./apk/apk.module').then(apk => apk.ApkModule) },
  { path: 'msge', loadChildren: () => import('./messages/messages.module').then(msge => msge.MessagesModule) },
  { path: 'bi', loadChildren: () => import('./base-info/base-info.module').then(bi => bi.BaseInfoModule) },
  { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(pr => pr.PrivacyModule) },
  { path: 'm', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule) },
  { path: 'mu', loadChildren: () => import('./user-manager/user-manager.module').then(userManager => userManager.UserManagerModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameWorkRoutingModule { }
