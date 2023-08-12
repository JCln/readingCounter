import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { SectionsService } from 'services/sections.service';
import { SectorsManagerService } from 'services/sectors-manager.service';

@Component({
  selector: 'app-zone-bound-add-dg',
  templateUrl: './zone-bound-add-dg.component.html',
  styleUrls: ['./zone-bound-add-dg.component.scss']
})
export class ZoneBoundAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ZoneBoundAddDgComponent>,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionsService: SectionsService,
    private sectorsManagerService: SectorsManagerService
  ) {
    data = data.di
    this.form = fb.group({
      id: [''],
      title: '',
      zoneId: data.zoneId,
      govermentalCode: '',
      fromEshterak: '',
      toEshterak: '',
      fromRadif: [''],
      toRadif: [''],
      host: '',
      dbUserName: '',
      dbPassword: '',
      dbInitialCatalog: ''
    })
  }
  async save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    if (!await this.sectorsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ZoneBoundADD, this.form.value))
      return;

    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}