import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-zone-bound-add-dg',
  templateUrl: './zone-bound-add-dg.component.html',
  styleUrls: ['./zone-bound-add-dg.component.scss']
})
export class ZoneBoundAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<ZoneBoundAddDgComponent>, fb: FormBuilder) {
    this.form = fb.group({
      id: 0,
      title: '',
      zoneId: 0,
      govermentalCode: '',
      fromEshterak: '',
      toEshterak: '',
      fromRadif: 0,
      toRadif: 0,
      host: '',
      dbUserName: '',
      dbPassword: '',
      dbInitialCatalog: ''
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}