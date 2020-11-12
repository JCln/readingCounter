import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss']
})
export class UserInputsComponent implements OnInit {
  userInputForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.userInputForm = fb.group({
      firstName: ['', Validators.required],
      sureName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      // displayName: ['', Validators.required],
      // password: ['', Validators.required],
      // confirmPassword: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      // username: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      // userCode: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      // email: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      // displayMobile: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      // isActive: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      // deviceId: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],//, forbiddenNameValidator(/bob/i)   
    });
  }
  submit = () => {
    console.log(this.userInputForm);
  }
  ngOnInit(): void {
  }

  // profileForm = this.fb.group({
  //   firstName: ['', Validators.required],
  //   sureName: ['', Validators.required],
  //   nationalId: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
  //   Validators.minLength(10), Validators.maxLength(10)]],
  //   phoneNumber: ['', [Validators.pattern("^[0-9]*$"),
  //   Validators.minLength(8), Validators.maxLength(10)]],
  //   fatherName: [''],
  //   mobile: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],//, forbiddenNameValidator(/bob/i)   
  //   SelectedServices: this.fb.array([1, 2]),
  //   neighbourBillId: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3),
  //   Validators.maxLength(13)]],
  //   address: ['', [Validators.required, Validators.minLength(10)]],
  //   requestOrigin: 6,
  //   postalCode: ['', [Validators.pattern("^[0-9]*$"),
  //   Validators.minLength(9), Validators.maxLength(10)]]
  // });
}
