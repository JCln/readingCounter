import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-zone-bound-add-dg',
  templateUrl: './zone-bound-add-dg.component.html',
  styleUrls: ['./zone-bound-add-dg.component.scss']
})
export class ZoneBoundAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ZoneBoundAddDgComponent>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data = data.di
    this.form = fb.group({
      id: 0,
      title: '',
      zoneId: data.zoneId,
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