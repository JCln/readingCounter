import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ap', loadChildren: () => import('./auth1/auth1.module').then(auth1 => auth1.Auth1Module) },
  { path: 'me', loadChildren: () => import('./auth2/auth2.module').then(auth2 => auth2.Auth2Module) },
  { path: 'cr', loadChildren: () => import('./auth3/auth3.module').then(auth3 => auth3.Auth3Module) },
  { path: 'ac', loadChildren: () => import('./auth4/auth4.module').then(auth4 => auth4.Auth4Module) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthlevelsRoutingModule { }
