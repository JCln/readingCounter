import { NgModule } from '@angular/core';
import { SiphonRoutingModule } from './siphon-routing.module';
import { SiphonComponent } from './siphon.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';


@NgModule({
  declarations: [
    SiphonComponent
  ],
  imports: [
    SharedPrimeNgModule,
    SiphonRoutingModule
  ]
})
export class SiphonModule { }
