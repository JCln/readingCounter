import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth1', loadChildren: () => import('./auth1/auth1.module').then(auth1 => auth1.Auth1Module) },
  { path: 'auth2', loadChildren: () => import('./auth2/auth2.module').then(auth2 => auth2.Auth2Module) },
  { path: 'auth3', loadChildren: () => import('./auth3/auth3.module').then(auth3 => auth3.Auth3Module) },
  { path: 'auth4', loadChildren: () => import('./auth4/auth4.module').then(auth4 => auth4.Auth4Module) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthlevelsRoutingModule { }
