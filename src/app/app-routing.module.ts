import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from './auth/guard.service';
import { LoginComponent } from './auth/login/login.component';
import { HfcComponent } from './core/_layouts/hfc/hfc.component';
import { LayoutComponent } from './core/_layouts/layout/layout.component';
import { PageNotFoundComponent } from './frame-work/page-not-found/page-not-found.component';
import { CustomPreloadingStrategyService } from 'services/custom-preloading-strategy.service';


const routes: Routes = [
  {
    path: '', component: HfcComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'about', loadChildren: () => import('./about/about.module').then(aboutUs => aboutUs.AboutModule) },
    ]
  },
  {
    path: '', canActivate: [GuardService], component: LayoutComponent, children: [
      { path: 'wr', loadChildren: () => import('./frame-work/frame-work.module').then(fr => fr.FrameWorkModule) }
    ]
  },
  { path: 'pnf', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'pnf', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload', preloadingStrategy: CustomPreloadingStrategyService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
