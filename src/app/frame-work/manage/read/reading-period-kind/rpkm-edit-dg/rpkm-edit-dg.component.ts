import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-rpkm-edit-dg',
  templateUrl: './rpkm-edit-dg.component.html',
  styleUrls: ['./rpkm-edit-dg.component.scss']
})
export class RpkmEditDgComponent {

  form: FormGroup;
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RpkmEditDgComponent>,
    fb: FormBuilder,
    private sectionsService: SectionsService
  ) {
    data = data.row;

    this.form = fb.group({
      id: data.id,
      title: data.title,
      moshtarakinId: data.moshtarakinId,
      clientOrder: data.clientOrder,
      isEnabled: data.isEnabled
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
