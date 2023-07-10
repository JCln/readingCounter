import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'mserr', loadChildren: () => import('./server-errors/server-errors.module').then(manageServerErrors => manageServerErrors.ServerErrorsModule) },
  { path: 'policies', loadChildren: () => import('./privacy/privacy.module').then(pr => pr.PrivacyModule) },
  { path: 'policyHistory', loadChildren: () => import('./policy-history/policy-history.module').then(policyHistory => policyHistory.PolicyHistoryModule) },
  { path: 'osInfo', loadChildren: () => import('./server-os-info/server-os-info.module').then(osInfo => osInfo.ServerOsInfoModule) },
  { path: 'ipRules', loadChildren: () => import('./ip-special-rules/ip-special-rules.module').then(ipSpecialRules => ipSpecialRules.IpSpecialRulesModule) },
  { path: 'ms', loadChildren: () => import('./manage-server/manage-server.module').then(ms => ms.ManageServerModule) },
  { path: 'msdriveinfo', loadChildren: () => import('./drives-info/drives-info.module').then(manageDriveInfos => manageDriveInfos.DrivesInfoModule) },
  { path: 'roleHistory', loadChildren: () => import('./role-history/role-history.module').then(roleHistory => roleHistory.RoleHistoryModule) },
  { path: 'userRoleHistory', loadChildren: () => import('./user-role-history/user-role-history.module').then(userRoleHistory => userRoleHistory.UserRoleHistoryModule) },
  { path: 'usersLogins', loadChildren: () => import('./reqlog-users-logins/reqlog-users-logins.module').then(requestLogUsersLogins => requestLogUsersLogins.ReqlogUsersLoginsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingsRoutingModule { }