import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditContactManagerService } from 'src/app/services/edit-contact-manager.service';

@Component({
  selector: 'app-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss']
})
export class UserInputsComponent implements OnInit {
  userInputForm: FormGroup;

  constructor(fb: FormBuilder, private editUserManagerService: EditContactManagerService) {
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
    this.editUserManagerService.addAUserPersonalInfo(this.userInputForm);
  }
  ngOnInit(): void {
  }
}
