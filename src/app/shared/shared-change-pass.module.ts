import { ModuleWithProviders, NgModule } from '@angular/core';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        ChangePasswordComponent
    ]
})
export class SharedChangePassModule {
    static forRoot(): ModuleWithProviders<SharedChangePassModule> {
        // Forcing the whole app to use the returned providers from the AppModule only.
        return {
            ngModule: SharedChangePassModule,
            providers: [ /* All of your services here. It will hold the services needed by `itself`. */]
        };
    }
}
