import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-rpm-add-dg',
  templateUrl: './rpkm-add-dg.component.html',
  styleUrls: ['./rpkm-add-dg.component.scss']
})
export class RpkmAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<RpkmAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionsService: SectionsService
  ) {
    this.form = fb.group({
      id: [''],
      title: [''],
      moshtarakinId: [''],
      clientOrder: [''],
      isEnabled: [false]
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