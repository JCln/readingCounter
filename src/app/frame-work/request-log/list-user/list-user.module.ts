import { NgModule } from '@angular/core';

import { ListUserRoutingModule } from './list-user-routing.module';
import { ListUserComponent } from './list-user.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    ListUserComponent
  ],
  imports: [
    SharedPrimeNgModule,
    ListUserRoutingModule
  ]
})
export class ListUserModule { }
