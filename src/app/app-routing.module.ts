import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { HfcComponent } from './core/_layouts/hfc/hfc.component';
import { LayoutComponent } from './core/_layouts/layout/layout.component';
import { FrameWorkComponent } from './frame-work/frame-work.component';


const routes: Routes = [
  {
    path: '', component: HfcComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '', component: LayoutComponent, children: [
      {
        path: 'fr', component: FrameWorkComponent
                
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
