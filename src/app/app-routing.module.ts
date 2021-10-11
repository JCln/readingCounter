import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from './auth/guard.service';
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
    path: '', canActivate: [GuardService], component: LayoutComponent, children: [
      { path: 'wr', loadChildren: () => import('./frame-work/frame-work.module').then(fr => fr.FrameWorkModule) }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
