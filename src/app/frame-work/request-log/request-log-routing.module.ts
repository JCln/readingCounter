import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Anonymous', loadChildren: () => import('./list-anonymous/list-anonymous.module').then(anonymous => anonymous.ListAnonymousModule) },
  { path: 'unAuthorized', loadChildren: () => import('./list-un-authorized/list-un-authorized.module').then(unAuthorized => unAuthorized.ListUnAuthorizedModule) },
  { path: 'User', loadChildren: () => import('./list-user/list-user.module').then(ListUser => ListUser.ListUserModule) },
  { path: 'userActivation', loadChildren: () => import('./activation-user/activation-user.module').then(UserActivation => UserActivation.ActivationUserModule) },
  { path: 'userMaster', loadChildren: () => import('./user-master-history/user-master-history.module').then(userMasterHistory => userMasterHistory.UserMasterHistoryModule) },
  { path: 'userDetails', loadChildren: () => import('./user-details-history/user-details-history.module').then(userDetailsHistory => userDetailsHistory.UserDetailsHistoryModule) },
  { path: 'notificationList', loadChildren: () => import('./notif-list-bydate/notif-list-bydate.module').then(notificationListByDate => notificationListByDate.NotifListBydateModule) },
  { path: 'getBlocked', loadChildren: () => import('./ipfilter-getblocked/ipfilter-getblocked.module').then(IpFilterGetBlocked => IpFilterGetBlocked.IpfilterGetblockedModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestLogRoutingModule { }
