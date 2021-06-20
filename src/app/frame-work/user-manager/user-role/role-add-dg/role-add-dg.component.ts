import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ZoneAddDgComponent } from 'src/app/frame-work/manage/zones/zone/zone-add-dg/zone-add-dg.component';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-role-add-dg',
  templateUrl: './role-add-dg.component.html',
  styleUrls: ['./role-add-dg.component.scss']
})
export class RoleAddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<ZoneAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionsService: SectionsService
  ) {
    data = data.di;
    this.form = fb.group({
      title: [''],
      isActive: true,
      needDeviceIdLogin: false,
      titleUnicode: ['']
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
