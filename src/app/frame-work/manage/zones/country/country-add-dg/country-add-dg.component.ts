import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { SectionsService } from 'services/sections.service';

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
    private dictionaryWrapperService: DictionaryWrapperService
  ) {
    this.form = fb.group({
      id: [''],
      title: '',
    })
  }
  save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    this.dictionaryWrapperService.cleanSingleDictionary('countryDictionary');
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}