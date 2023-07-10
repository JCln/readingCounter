import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { NgModule } from '@angular/core';

import { UserMasterHistoryRoutingModule } from './user-master-history-routing.module';
import { UserMasterHistoryComponent } from './user-master-history.component';


@NgModule({
  declarations: [
    UserMasterHistoryComponent
  ],
  imports: [
    SharedPrimeNgModule,
    UserMasterHistoryRoutingModule
  ]
})
export class UserMasterHistoryModule { }
