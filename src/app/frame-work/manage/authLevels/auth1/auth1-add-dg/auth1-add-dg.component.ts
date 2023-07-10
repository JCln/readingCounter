import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { AuthsManagerService } from 'services/auths-manager.service';
import { SectionsService } from 'services/sections.service';

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
    private sectionsService: SectionsService,
    private authsManagerService: AuthsManagerService
  ) {
    this.form = fb.group({
      id: [''],
      title: [''],
      cssClass: [''],
      inSidebar: false,
      logicalOrder: ['']
    })
  }
  async save() {
    this.sectionsService.setSectionsValue(this.form.value);
    if (!this.sectionsService.sectionVertification()) {
      return;
    }
    if (!await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel1ADD, this.form.value))
      return;

    this.authsManagerService.dictionaryWrapperService.cleanSingleDictionary('authLev1Dictionary');
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
