import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'all', loadChildren: () => import('./users-all/users-all.module').then(usersAll => usersAll.UsersAllModule) },
  { path: 'add', loadChildren: () => import('./add-user/user-add.module').then(userAdd => userAdd.UserAddModule) },
  { path: 'eor', loadChildren: () => import('./user-edit-on-role/user-edit-on-role.module').then(userEditOnRole => userEditOnRole.UserEditOnRoleModule) },
  { path: 'edit/:id', loadChildren: () => import('./user-edit/edit-user.module').then(userEdit => userEdit.UserEditModule) },
  { path: 'role', loadChildren: () => import('./user-role/user-role.module').then(userRoles => userRoles.UserRoleModule) },
  { path: 'search', loadChildren: () => import('./user-search/user-search.module').then(userSearch => userSearch.UserSearchModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule { }
