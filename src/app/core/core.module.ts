import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';

import { FrameWorkComponent } from './../wrapper/frame-work/frame-work.component';
import { DropdownComponent } from './_layouts/dropdown/dropdown.component';
import { HeaderComponent } from './_layouts/header/header.component';
import { HfcComponent } from './_layouts/hfc/hfc.component';
import { LayoutComponent } from './_layouts/layout/layout.component';
import { AnonyHeaderComponent } from './anony-header/anony-header.component';
import { CoreRoutingModule } from './core-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TabWrapperComponent } from './tab-wrapper/tab-wrapper.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SideBarComponent,
    TabWrapperComponent,
    HfcComponent,
    HeaderComponent,
    AnonyHeaderComponent,
    FrameWorkComponent,
    DropdownComponent
  ]
  ,
  imports: [
    CommonModule,
    FormsModule,
    DpDatePickerModule,
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
