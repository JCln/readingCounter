import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HeaderComponent } from './_layouts/header/header.component';
import { HfcComponent } from './_layouts/hfc/hfc.component';
import { LayoutComponent } from './_layouts/layout/layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TabWrapperComponent } from './tab-wrapper/tab-wrapper.component';
import { AnonyHeaderComponent } from './anony-header/anony-header.component';


@NgModule({
  declarations: [LayoutComponent, SideBarComponent, TabWrapperComponent, HfcComponent, HeaderComponent, AnonyHeaderComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      console.log('CoreModule should be imported ONLY in AppModule.');

      throw new Error("CoreModule should be imported ONLY in AppModule.");
    }
  }
}
