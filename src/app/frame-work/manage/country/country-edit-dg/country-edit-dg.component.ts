import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-country-edit-dg',
  templateUrl: './country-edit-dg.component.html',
  styleUrls: ['./country-edit-dg.component.scss']
})
export class CountryEditDgComponent {
  form: FormGroup;

  constructor(fb: FormBuilder,
    private dialogRef: MatDialogRef<CountryEditDgComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.form = fb.group({
      id: data.id,
      title: data.title
    })

  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
