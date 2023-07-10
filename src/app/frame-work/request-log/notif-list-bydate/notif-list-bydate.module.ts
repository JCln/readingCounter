import { NgModule } from '@angular/core';

import { NotifListBydateRoutingModule } from './notif-list-bydate-routing.module';
import { NotifListBydateComponent } from './notif-list-bydate.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { SharedCollapseModule } from 'src/app/shared/shared-collapse.module';


@NgModule({
  declarations: [
    NotifListBydateComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SharedCollapseModule,
    NotifListBydateRoutingModule
  ]
})
export class NotifListBydateModule { }
