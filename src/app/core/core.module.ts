import { CodeMessageDgComponent } from 'src/app/shared/code-message-dg/code-message-dg.component';
import { SharedPrimeNgModule } from 'src/app/shared/shared-prime-ng.module';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GlobalErrorHandlerService } from 'services/global-error-handler.service';

import { InterceptorService } from '../auth/interceptor.service';
import { SpinnerInterceptorService } from '../auth/spinner-interceptor.service';
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
import { CaptchaComponent } from '../shared/captcha/captcha.component';
import { SharedChangePassModule } from '../shared/shared-change-pass.module';
import { MyPreviousFailuresComponent } from './_layouts/header/my-previous-failures/my-previous-failures.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SideBarComponent,
    CaptchaComponent,
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
    ColorPaletteComponent,
    MyPreviousFailuresComponent,
    CodeMessageDgComponent,
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
    SharedChangePassModule,
    SharedPrimeNgModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    CoreRoutingModule
  ],
  exports: [
    BrowserModule,
    CommonModule,
    MatSnackBarModule,
    SharedThreeModule,
    ProgressSpinnerModule,
    SharedChangePassModule,
    SharedPrimeNgModule,
    // components
    SmallSpinnerComponent,
    SpinnerComponent,
    ClockComponent,
    CaptchaComponent,
    SnackBarComponent,
    BrowserAnimationsModule,
    AnnouceNotifComponent,

    CoreRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    MessageService,
    DialogService
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
