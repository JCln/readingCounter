import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-auth3-edit-dg',
  templateUrl: './auth3-edit-dg.component.html',
  styleUrls: ['./auth3-edit-dg.component.scss']
})
export class Auth3EditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth3EditDgComponent>,
    fb: FormBuilder,
    private sectionsService: SectionsService
  ) {
    const editable = data.editable;
    data = data.row;
    this.selected = data.authLevel2Id;
    this.form = fb.group({
      id: data.id,
      title: data.title,
      authLevel2Id: editable,
      cssClass: data.cssClass,
      route: data.route,
      inSidebar: data.inSidebar,
      isClosable: data.isClosable,
      isRefreshable: data.isRefreshable,
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