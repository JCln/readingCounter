import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-region-add-dg',
  templateUrl: './region-add-dg.component.html',
  styleUrls: ['./region-add-dg.component.scss']
})
export class RegionAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(fb: FormBuilder,
    private dialogRef: MatDialogRef<RegionAddDgComponent>) {
    this.form = fb.group({
      id: 0,
      title: '',
      provinceId: 0,
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