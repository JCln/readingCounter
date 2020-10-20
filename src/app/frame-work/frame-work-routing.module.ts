import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'foo', loadChildren: () => import('./foo/foo.module').then(foo => foo.FooModule) },
  { path: 'test', loadChildren: () => import('./test/test.module').then(t => t.TestModule) },
  { path: 'table', loadChildren: () => import('./table/table.module').then(tb => tb.TableModule) },
  { path: 'ms', loadChildren: () => import('./manage-server/manage-server.module').then(ms => ms.ManageServerModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule) },
  { path: 'apk', loadChildren: () => import('./apk/apk.module').then(apk => apk.ApkModule) },
  { path: 'msge', loadChildren: () => import('./messages/messages.module').then(msge => msge.MessagesModule) },
  { path: 'bi', loadChildren: () => import('./base-info/base-info.module').then(bi => bi.BaseInfoModule) },
  { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(pr => pr.PrivacyModule) },
  { path: 'rm', loadChildren: () => import('./role-manager/role-manager.module').then(rm => rm.RoleManagerModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameWorkRoutingModule { }
