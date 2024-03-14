import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule), data: { preload: true } },
  { path: 'license', loadChildren: () => import('./license/license.module').then(license => license.LicenseModule) },
  { path: 'waterMark', loadChildren: () => import('./water-mark/water-mark.module').then(waterMarkConfig => waterMarkConfig.WaterMarkModule) },
  { path: 'notification', loadChildren: () => import('./notification-message/notification-message.module').then(notificationMessage => notificationMessage.NotificationMessageModule) },
  { path: 'myLogins', loadChildren: () => import('./my-previouslogins/my-previouslogins.module').then(myPreviousLogins => myPreviousLogins.MyPreviousloginsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
