import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IChangePassword } from 'interfaces/inon-manage';
import { ProfileService } from 'services/profile.service';
import { HeaderComponent } from 'src/app/core/_layouts/header/header.component';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    @ViewChild("appHeader") appHeader: HeaderComponent;
    @Input() _isFromProfile: boolean = false;
    @Output() closeConfirmed = new EventEmitter<any>();

    constructor(
        public profileService: ProfileService,
    ) { }

    password: IChangePassword = { oldPassword: '', newPassword: '', confirmPassword: '' };

    changePassword = async () => {
        if (this._isFromProfile) {
            const res = await this.profileService.changePassword(this.password);
            console.log(res);
            this.profileService.showMessage(res.message);
            this.onCloseConfirmed();
        }
        else {
            console.log(1);

            if (this.profileService.verification(this.password)) {
                console.log(1);
                const res = await this.profileService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.changePassword, this.password);
                this.profileService.showMessage(res.message);
                // const res = await this.appHeader.changePasswordFromDialog();
                console.log(1);
                console.log(res);
                console.log('to logout');

                // const res = await this.profileService.changePasswordFromDialog(this.password);
                // console.log(res);
                // this.onCloseConfirmed();
            }
        }
    }
    onCloseConfirmed() {
        this.closeConfirmed.emit();
    }

}
