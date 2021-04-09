import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-auth1-edit-dg',
  templateUrl: './auth1-edit-dg.component.html',
  styleUrls: ['./auth1-edit-dg.component.scss']
})
export class Auth1EditDgComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth1EditDgComponent>,
    fb: FormBuilder,
    private sectionsService: SectionsService
  ) {
    this.form = fb.group({
      id: data.id,
      title: data.title,
      cssClass: data.cssClass,
      logicalOrder: data.logicalOrder,
      inSidebar: data.inSidebar
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
