import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-country-add-dg',
  templateUrl: './country-add-dg.component.html',
  styleUrls: ['./country-add-dg.component.scss']
})
export class CountryAddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<CountryAddDgComponent>
  ) {
    this.form = fb.group({
      id: [''],
      title: '',
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}