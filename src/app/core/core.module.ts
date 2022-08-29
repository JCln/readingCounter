import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GlobalErrorHandlerService } from 'services/global-error-handler.service';

import { InterceptorService } from '../auth/interceptor.service';
import { SpinnerInterceptorService } from '../auth/spinner-interceptor.service';
import { TimeoutInterceptorService } from '../auth/timeout-interceptor.service';
import { FrameWorkComponent } from './../frame-work/frame-work.component';
import { AddNewComponent } from './../frame-work/manage/add-new/add-new.component';
import { AnnouceNotifComponent } from './../shared/annouce-notif/annouce-notif.component';
import { SharedThreeModule } from './../shared/shared_three.module';
import { DropdownComponent } from './_layouts/dropdown/dropdown.component';
import { HeaderComponent } from './_layouts/header/header.component';
import { HfcComponent } from './_layouts/hfc/hfc.component';
import { LayoutComponent } from './_layouts/layout/layout.component';
import { AnonyHeaderComponent } from './anony-header/anony-header.component';
import { ClockComponent } from './clock/clock.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { CoreRoutingModule } from './core-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SmallSpinnerComponent } from './small-spinner/small-spinner.component';
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
    AddNewComponent,
    FrameWorkComponent,
    SpinnerComponent,
    SnackBarComponent,
    ClockComponent,
    AnnouceNotifComponent,
    SmallSpinnerComponent,
    ColorPaletteComponent
  ]
  ,
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }),
    MatSnackBarModule,
    MatDialogModule,
    SharedThreeModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    CoreRoutingModule
  ],
  exports: [
    BrowserModule,
    CommonModule,
    MatSnackBarModule,
    SpinnerComponent,
    SmallSpinnerComponent,
    SnackBarComponent,
    ClockComponent,
    SharedThreeModule,
    ProgressSpinnerModule,
    // components
    BrowserAnimationsModule,
    AnnouceNotifComponent,

    CoreRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptorService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
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
