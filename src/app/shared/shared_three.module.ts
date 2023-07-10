import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { ToastModule } from 'primeng/toast';

import { DateJalaliComponent } from '../core/_layouts/header/date-jalali/date-jalali.component';
import { TimeJalaliComponent } from '../core/_layouts/header/time-jalali/time-jalali.component';


@NgModule({
    declarations: [
        DateJalaliComponent,
        TimeJalaliComponent
    ],
    imports: [
        FormsModule,
        ToastModule,
        DpDatePickerModule
    ],
    exports: [
        TimeJalaliComponent,
        DateJalaliComponent,
        DpDatePickerModule,
        FormsModule,
        ToastModule,
    ]
})
export class SharedThreeModule {
    static forRoot(): ModuleWithProviders<SharedThreeModule> {
        // Forcing the whole app to use the returned providers from the AppModule only.
        return {
            ngModule: SharedThreeModule,
            providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
        };
    }
}
