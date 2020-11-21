import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-zone-bound-edit-dg',
  templateUrl: './zone-bound-edit-dg.component.html',
  styleUrls: ['./zone-bound-edit-dg.component.scss']
})
export class ZoneBoundEditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ZoneBoundEditDgComponent>,
    fb: FormBuilder
  ) {
    data = data.row;
    this.selected = data.zoneId;
    this.form = fb.group({
      id: data.id,
      title: data.title,
      zoneId: data.zoneId,
      govermentalCode: data.govermentalCode,
      fromEshterak: data.fromEshterak,
      toEshterak: data.toEshterak,
      fromRadif: data.fromRadif,
      toRadif: data.toRadif,
      host: data.host,
      dbUserName: data.dbUserName,
      dbPassword: data.dbPassword,
      dbInitialCatalog: data.dbInitialCatalog
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
