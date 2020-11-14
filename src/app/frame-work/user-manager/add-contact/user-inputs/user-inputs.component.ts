import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUserManagerService } from 'src/app/services/add-user-manager.service';

@Component({
  selector: 'app-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss']
})
export class UserInputsComponent implements OnInit {
  userInputForm: FormGroup;

  constructor(fb: FormBuilder, private addUserManagerService: AddUserManagerService) {
    this.userInputForm = fb.group({
      userCode: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      sureName: ['', Validators.required],
      email: [''],
      mobile: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      displayMobile: ['', Validators.required],
      displayName: ['', Validators.required],
      isActive: [''],
      deviceId: [''],//, forbiddenNameValidator(/bob/i)   
    });
  }
  submit = () => {
    console.log(this.userInputForm);
    this.addUserManagerService.addAUserPersonalInfo(this.userInputForm);
  }
  ngOnInit(): void {
  }
}
