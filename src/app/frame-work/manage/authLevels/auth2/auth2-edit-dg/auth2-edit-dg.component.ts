import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-auth2-edit-dg',
  templateUrl: './auth2-edit-dg.component.html',
  styleUrls: ['./auth2-edit-dg.component.scss']
})
export class Auth2EditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth2EditDgComponent>,
    fb: FormBuilder,
    private sectionsService: SectionsService
  ) {
    data = data.row;
    this.selected = data.authLevel1Id;
    this.form = fb.group({
      id: data.id,
      authLevel1Id: data.id,
      title: data.title,
      cssClass: data.cssClass,
      route: data.route,
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
