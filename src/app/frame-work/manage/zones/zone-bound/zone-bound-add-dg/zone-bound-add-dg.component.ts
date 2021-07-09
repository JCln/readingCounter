import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'services/sections.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionsService: SectionsService
  ) {
    data = data.di
    this.form = fb.group({
      id: [''],
      title: '',
      zoneId: data.zoneId,
      govermentalCode: '',
      fromEshterak: '',
      toEshterak: '',
      fromRadif: [''],
      toRadif: [''],
      host: '',
      dbUserName: '',
      dbPassword: '',
      dbInitialCatalog: ''
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