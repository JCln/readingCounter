import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-zone-add-dg',
  templateUrl: './zone-add-dg.component.html',
  styleUrls: ['./zone-add-dg.component.scss']
})
export class ZoneAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<ZoneAddDgComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data = data.di;
    this.form = fb.group({
      id: 0,
      title: '',
      regionId: data.regionId,
      isMetro: true,
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