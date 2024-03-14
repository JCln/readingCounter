import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Anonymous', loadChildren: () => import('./list-anonymous/list-anonymous.module').then(anonymous => anonymous.ListAnonymousModule) },
  { path: 'unAuthorized', loadChildren: () => import('./list-un-authorized/list-un-authorized.module').then(unAuthorized => unAuthorized.ListUnAuthorizedModule) },
  { path: 'User', loadChildren: () => import('./list-user/list-user.module').then(ListUser => ListUser.ListUserModule) },
  { path: 'userActivation', loadChildren: () => import('./activation-user/activation-user.module').then(UserActivation => UserActivation.ActivationUserModule) },
  { path: 'userMaster', loadChildren: () => import('./user-master-history/user-master-history.module').then(userMasterHistory => userMasterHistory.UserMasterHistoryModule) },
  { path: 'userDetails', loadChildren: () => import('./user-details-history/user-details-history.module').then(userDetailsHistory => userDetailsHistory.UserDetailsHistoryModule) },
  { path: 'userCompare', loadChildren: () => import('./user-compare/user-compare.module').then(userCompareModule => userCompareModule.UserCompareModule) },
  { path: 'notificationList', loadChildren: () => import('./notif-list-bydate/notif-list-bydate.module').then(notificationListByDate => notificationListByDate.NotifListBydateModule) },
  { path: 'getBlocked', loadChildren: () => import('./ipfilter-getblocked/ipfilter-getblocked.module').then(IpFilterGetBlocked => IpFilterGetBlocked.IpfilterGetblockedModule) },
  { path: 'authenticityAttempts', loadChildren: () => import('./authenticity-attempts/authenticity-attempts.module').then(authenticityAttempts => authenticityAttempts.AuthenticityAttemptsModule) },
  { path: 'getInvalidTime', loadChildren: () => import('./ipfilter-get-invalid-time/ipfilter-get-invalid-time.module').then(IpFilterGetInvalidTime => IpFilterGetInvalidTime.IpfilterGetInvalidTimeModule) },
  { path: 'IPFilterhistory', loadChildren: () => import('./ip-filter-history/ip-filter-history.module').then(IpFilterHistory => IpFilterHistory.IpFilterHistoryModule) },
  { path: 'IOPolicyHistory', loadChildren: () => import('./input-output-policy-history/input-output-policy-history.module').then(inputOutputPolicyHistory => inputOutputPolicyHistory.InputOutputPolicyHistoryModule) },
  { path: 'downloadAttempts', loadChildren: () => import('./download-attempts/download-attempts.module').then(downloadAttempts => downloadAttempts.DownloadAttemptsModule) },
  { path: 'uploadAttempts', loadChildren: () => import('./upload-attempts/upload-attempts.module').then(uploadAttempts => uploadAttempts.UploadAttemptsModule) },
  { path: 'getUploaded', loadChildren: () => import('./get-uploaded/get-uploaded.module').then(GetUploaded => GetUploaded.GetUploadedModule) },
  { path: 'memoryStatus', loadChildren: () => import('./log-memory-status/log-memory-status.module').then(LogMemoryStatus => LogMemoryStatus.LogMemoryStatusModule) },
  { path: 'inactiveEntity', loadChildren: () => import('./inactive-entity/inactive-entity.module').then(InActiveEntityLog => InActiveEntityLog.InactiveEntityModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestLogRoutingModule { }
