import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'all', loadChildren: () => import('./users-all/users-all.module').then(usersAll => usersAll.UsersAllModule), data: { preload: true } },
  { path: 'add', loadChildren: () => import('./add-user/user-add.module').then(userAdd => userAdd.UserAddModule), data: { preload: true } },
  { path: 'eor', loadChildren: () => import('./user-edit-on-role/user-edit-on-role.module').then(userEditOnRole => userEditOnRole.UserEditOnRoleModule) },
  { path: 'edit', loadChildren: () => import('./user-edit/edit-user.module').then(userEdit => userEdit.UserEditModule), data: { preload: true } },
  { path: 'role', loadChildren: () => import('./user-role/user-role.module').then(userRoles => userRoles.UserRoleModule) },
  { path: 'search', loadChildren: () => import('./user-search/user-search.module').then(userSearch => userSearch.UserSearchModule), data: { preload: true } },
  { path: 'userOnlines', loadChildren: () => import('./user-onlines/user-onlines.module').then(onlineUsers => onlineUsers.UserOnlinesModule), data: { preload: true } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule { }
