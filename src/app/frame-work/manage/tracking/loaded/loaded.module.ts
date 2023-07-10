import { NgModule } from '@angular/core';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';

import { LoadedRoutingModule } from './loaded-routing.module';
import { LoadedComponent } from './loaded.component';


@NgModule({
  declarations: [LoadedComponent],
  imports: [
    SharedPrimeNgModule,
    LoadedRoutingModule
  ]
})
export class LoadedModule { }
