import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-zone-add-dg',
  templateUrl: './zone-add-dg.component.html',
  styleUrls: ['./zone-add-dg.component.scss']
})
export class ZoneAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<ZoneAddDgComponent>, fb: FormBuilder) {
    this.form = fb.group({
      id: 0,
      title: '',
      regionId: 0,
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