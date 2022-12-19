import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule) },
  { path: 'license', loadChildren: () => import('./license/license.module').then(license => license.LicenseModule) },
  { path: 'waterMark', loadChildren: () => import('./water-mark/water-mark.module').then(waterMarkConfig => waterMarkConfig.WaterMarkModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
