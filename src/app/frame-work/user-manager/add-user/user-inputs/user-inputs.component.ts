import { Component } from '@angular/core';
import { IAddUserInfos } from 'interfaces/iuser-manager';

@Component({
  selector: 'app-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss']
})
export class UserInputsComponent {
  userInputForm: IAddUserInfos = {
    userCode: null,
    username: null,
    password: null,
    confirmPassword: null,
    firstName: '',
    sureName: '',
    email: '',
    mobile: '',
    displayMobile: false,
    displayName: '',
    isActive: true,
    deviceId: ''
  };

}
