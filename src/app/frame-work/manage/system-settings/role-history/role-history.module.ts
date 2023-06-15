import { NgModule } from '@angular/core';
import { RoleHistoryRoutingModule } from './role-history-routing.module';
import { RoleHistoryComponent } from './role-history.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    RoleHistoryComponent
  ],
  imports: [
    SharedPrimeNgModule,
    RoleHistoryRoutingModule
  ]
})
export class RoleHistoryModule { }
