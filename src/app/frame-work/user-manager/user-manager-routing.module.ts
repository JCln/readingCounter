import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'all', loadChildren: () => import('./users-all/users-all.module').then(usersAll => usersAll.UsersAllModule) },
  { path: 'add', loadChildren: () => import('./add-user/user-add.module').then(userAdd => userAdd.UserAddModule) },
  { path: 'edit/:id', loadChildren: () => import('./user-edit/edit-user.module').then(userEdit => userEdit.UserEditModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule { }
