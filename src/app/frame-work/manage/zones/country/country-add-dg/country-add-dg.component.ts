import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { SectionsService } from 'services/sections.service';
import { SectorsManagerService } from 'services/sectors-manager.service';

@Component({
  selector: 'app-country-add-dg',
  templateUrl: './country-add-dg.component.html',
  styleUrls: ['./country-add-dg.component.scss']
})
export class CountryAddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<CountryAddDgComponent>,
    private sectionsService: SectionsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private sectorsManagerService: SectorsManagerService
  ) {
    this.form = fb.group({
      id: [''],
      title: '',
    })
  }
  async save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    if (!await this.sectorsManagerService.addOrEditCountry(ENInterfaces.CountryADD, this.form.value))
      return;

    this.dictionaryWrapperService.cleanSingleDictionary('countryDictionary');
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}