import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-country-edit-dg',
  templateUrl: './country-edit-dg.component.html',
  styleUrls: ['./country-edit-dg.component.scss']
})
export class CountryEditDgComponent {
  form: FormGroup;
  
  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<CountryEditDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionsService: SectionsService
    ) {
    this.form = fb.group({
      id: data.id,
      title: data.title
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
