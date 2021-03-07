import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-zone-bound-edit-dg',
  templateUrl: './zone-bound-edit-dg.component.html',
  styleUrls: ['./zone-bound-edit-dg.component.scss']
})
export class ZoneBoundEditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ZoneBoundEditDgComponent>,
    fb: FormBuilder,
    private sectionsService: SectionsService
  ) {
    const editable = data.editable;
    data = data.row;
    this.selected = data.zoneId;
    this.form = fb.group({
      id: data.id,
      title: data.title,
      zoneId: editable,
      govermentalCode: data.govermentalCode,
      fromEshterak: data.fromEshterak,
      toEshterak: data.toEshterak,
      fromRadif: data.fromRadif,
      toRadif: data.toRadif,
      host: data.host,
      dbUserName: data.dbUserName,
      dbPassword: data.dbPassword,
      dbInitialCatalog: data.dbInitialCatalog
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
