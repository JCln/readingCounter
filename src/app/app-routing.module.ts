import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { HfcComponent } from './core/_layouts/hfc/hfc.component';
import { LayoutComponent } from './core/_layouts/layout/layout.component';


const routes: Routes = [
  {
    path: '', component: HfcComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '', component: LayoutComponent, children: [ // canActivate: [GuardService],
      { path: 'wr', loadChildren: () => import('./frame-work/frame-work.module').then(fr => fr.FrameWorkModule) }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
