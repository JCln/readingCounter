import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Anonymous', loadChildren: () => import('./list-anonymous/list-anonymous.module').then(anonymous => anonymous.ListAnonymousModule) },
  { path: 'User', loadChildren: () => import('./list-user/list-user.module').then(ListUser => ListUser.ListUserModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestLogRoutingModule { }
