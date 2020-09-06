import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './_layouts/layout/layout.component';
import { ClockComponent } from './clock/clock.component';
import { HeaderComponent } from './_layouts/header/header.component';


@NgModule({
  declarations: [LayoutComponent, ClockComponent, HeaderComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("CoreModule should be imported ONLY in AppModule.");
    }
  }
}
