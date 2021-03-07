import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-province-add-dg',
  templateUrl: './province-add-dg.component.html',
  styleUrls: ['./province-add-dg.component.scss']
})
export class ProvinceAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(fb: FormBuilder,
    private dialogRef: MatDialogRef<ProvinceAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionsService: SectionsService
  ) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: '',
      countryId: data.countryId,
      logicalOrder: ['']
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