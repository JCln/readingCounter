import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-rpm-add-dg',
  templateUrl: './rpm-add-dg.component.html',
  styleUrls: ['./rpm-add-dg.component.scss']
})
export class RpmAddDgComponent {
  selectedValue: string;
  readingPeriodKindId: any;
  form: FormGroup;
  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<RpmAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionsService: SectionsService
  ) {
    this.readingPeriodKindId = data.rpkmId;
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: [''],
      zoneId: data.zoneId,
      moshtarakinId: [''],
      readingPeriodKindId: [0],
      clientOrder: ['']
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