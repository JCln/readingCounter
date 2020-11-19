import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    private dialogRef: MatDialogRef<CountryAddDgComponent>
  ) {
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}