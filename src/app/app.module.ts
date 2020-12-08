import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { CoreModule } from './core/core.module';
import { SharedTwoModule } from './shared/shared-two.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent    
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
