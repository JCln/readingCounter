import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLevelsComponent } from './auth-levels.component';

const routes: Routes = [
  { path: '', component: AuthLevelsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLevelsRoutingModule { }
