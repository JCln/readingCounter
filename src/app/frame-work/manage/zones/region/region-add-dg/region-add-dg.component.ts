import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { SectionsService } from 'services/sections.service';
import { SectorsManagerService } from 'services/sectors-manager.service';

@Component({
  selector: 'app-region-add-dg',
  templateUrl: './region-add-dg.component.html',
  styleUrls: ['./region-add-dg.component.scss']
})
export class RegionAddDgComponent {
  form: FormGroup;

  constructor(fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RegionAddDgComponent>,
    private sectionsService: SectionsService,
    private sectorsManagerService: SectorsManagerService
  ) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: '',
      provinceId: data.provinceId,
      logicalOrder: ['']
    })
  }
  async save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    if (!await this.sectorsManagerService.sectorsAddEdit(ENInterfaces.RegionADD, this.form.value))
      return;

    this.sectorsManagerService.dictionaryWrapperService.cleanSingleDictionary('regionDictionary');
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}