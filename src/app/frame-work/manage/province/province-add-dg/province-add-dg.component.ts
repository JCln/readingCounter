import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-province-add-dg',
  templateUrl: './province-add-dg.component.html',
  styleUrls: ['./province-add-dg.component.scss']
})
export class ProvinceAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(fb: FormBuilder,
    private dialogRef: MatDialogRef<ProvinceAddDgComponent>
  ) {
    this.form = fb.group({
      id: 0,
      title: '',
      countryId: 0,
      logicalOrder: 0
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}