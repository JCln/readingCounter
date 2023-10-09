import { NgModule } from '@angular/core';
import { RoleHistoryRoutingModule } from './role-history-routing.module';
import { RoleHistoryComponent } from './role-history.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { RoleHistoryDetailsComponent } from './role-history-details/role-history-details.component';
import { RoleCompareComponent } from './role-compare/role-compare.component';


@NgModule({
  declarations: [
    RoleHistoryComponent,
    RoleHistoryDetailsComponent,
    RoleCompareComponent
  ],
  imports: [
    SharedPrimeNgModule,
    RoleHistoryRoutingModule
  ]
})
export class RoleHistoryModule { }
