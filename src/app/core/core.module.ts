import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';

import { FrameWorkComponent } from './../frame-work/frame-work.component';
import { InterceptorService } from './../services/interceptor.service';
import { SpinnerInterceptorService } from './../services/spinner-interceptor.service';
import { DropdownComponent } from './_layouts/dropdown/dropdown.component';
import { HeaderComponent } from './_layouts/header/header.component';
import { HfcComponent } from './_layouts/hfc/hfc.component';
import { LayoutComponent } from './_layouts/layout/layout.component';
import { AnonyHeaderComponent } from './anony-header/anony-header.component';
import { ClockComponent } from './clock/clock.component';
import { CoreRoutingModule } from './core-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TabWrapperComponent } from './tab-wrapper/tab-wrapper.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SideBarComponent,
    TabWrapperComponent,
    HfcComponent,
    HeaderComponent,
    AnonyHeaderComponent,
    DropdownComponent,
    FrameWorkComponent,
    SpinnerComponent,
    SnackBarComponent,
    ClockComponent
  ]
  ,
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }),
    DpDatePickerModule,
    MatSnackBarModule,
    CoreRoutingModule
  ],
  exports: [
    MatSnackBarModule,
    SpinnerComponent,
    SnackBarComponent,
    ClockComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
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
