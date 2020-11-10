import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ClockComponent } from './core/clock/clock.component';
import { CoreModule } from './core/core.module';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { SharedTwoModule } from './shared/shared-two.module';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    CoreModule,
    SharedTwoModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
