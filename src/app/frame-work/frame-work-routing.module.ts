import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from '../auth/guard.service';

const routes: Routes = [
  { path: '', canActivate: [GuardService], loadChildren: () => import('./map/map.module').then(mapComponent => mapComponent.MapModule) },
  { path: 'imd', canActivate: [GuardService], loadChildren: () => import('./import-dynamic/import-dynamic.module').then(importDynamicDto => importDynamicDto.ImportDynamicModule) },
  { path: 'profile', canActivate: [GuardService], loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule) },  
  { path: 'msge', canActivate: [GuardService], loadChildren: () => import('./messages/messages.module').then(msge => msge.MessagesModule) },
  { path: 'privacy', canActivate: [GuardService], loadChildren: () => import('./privacy/privacy.module').then(pr => pr.PrivacyModule) },
  { path: 'rpts', canActivate: [GuardService], loadChildren: () => import('./reports/reports.module').then(reports => reports.ReportsModule) },
  { path: 'm', canActivate: [GuardService], loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule) },
  { path: 'mu', canActivate: [GuardService], loadChildren: () => import('./user-manager/user-manager.module').then(userManager => userManager.UserManagerModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameWorkRoutingModule { }
