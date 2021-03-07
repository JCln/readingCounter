import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-auth3-add-dg',
  templateUrl: './auth3-add-dg.component.html',
  styleUrls: ['./auth3-add-dg.component.scss']
})
export class Auth3AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth3AddDgComponent>,
    private sectionsService: SectionsService
  ) {
    data = data.di;
    this.form = fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      authLevel2Id: data.authLevel2Id,
      cssClass: [''],
      route: [''],
      inSidebar: [false],
      isClosable: [false],
      isRefreshable: [false],
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