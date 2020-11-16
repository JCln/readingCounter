import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-country-add-dg',
  templateUrl: './country-add-dg.component.html',
  styleUrls: ['./country-add-dg.component.scss']
})
export class CountryAddDgComponent {
  addNew: any = {
    id: 0,
    title: ''
  }
  selectedValue: string;
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CountryAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}