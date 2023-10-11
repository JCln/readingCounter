import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IChangePassword } from 'interfaces/inon-manage';
import { ProfileService } from 'services/profile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    @Input() _isFromProfile: boolean = false;
    @Output() closeConfirmed = new EventEmitter<any>();

    constructor(
        public profileService: ProfileService,
        private authService: AuthService
    ) { }

    password: IChangePassword = { oldPassword: '', newPassword: '', confirmPassword: '' };

    onCloseConfirmed() {
        this.closeConfirmed.emit();
    }
    changePassword = async () => {
        if (this._isFromProfile) {
            const res = await this.profileService.changePassword(this.password);
            this.profileService.showMessage(res.message);
            this.onCloseConfirmed();
        }
        else {
            if (this.profileService.verification(this.password)) {
                const res = await this.profileService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.changePassword, this.password);
                const refreshResponse = await this.authService.getRefreshToken();
                if (refreshResponse) {
                    this.authService.saveTolStorage(refreshResponse);
                    this.profileService.showMessage(res.message);
                    this.onCloseConfirmed();
                }
                else {
                    this.profileService.showMessage(EN_messages.reLoginPlease);
                    this.authService.logout();
                }
            }
        }
    }

}
