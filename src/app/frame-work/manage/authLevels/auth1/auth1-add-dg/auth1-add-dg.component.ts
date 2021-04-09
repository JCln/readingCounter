import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-auth1-add-dg',
  templateUrl: './auth1-add-dg.component.html',
  styleUrls: ['./auth1-add-dg.component.scss']
})
export class Auth1AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<Auth1AddDgComponent>,
    private sectionsService: SectionsService
  ) {
    this.form = fb.group({
      id: [''],
      title: [''],
      cssClass: [''],
      inSidebar: [''],
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
