import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-province-edit-dg',
  templateUrl: './province-edit-dg.component.html',
  styleUrls: ['./province-edit-dg.component.scss']
})
export class ProvinceEditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProvinceEditDgComponent>,
    private sectionsService: SectionsService
  ) {
    const editable = data.editable;
    data = data.row;
    this.selected = data.countryId;

    this.form = fb.group({
      id: data.id,
      title: data.title,
      countryId: editable,
      logicalOrder: data.logicalOrder
    })
  }
  save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
