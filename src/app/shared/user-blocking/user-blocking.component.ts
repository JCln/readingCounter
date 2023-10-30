import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ReadManagerService } from 'services/read-manager.service';

@Component({
  selector: 'app-user-blocking',
  templateUrl: './user-blocking.component.html',
  styleUrls: ['./user-blocking.component.scss']
})
export class UserBlockingComponent implements OnInit {
  form: FormGroup;
  userAllDictionary: IDictionaryManager[] = [];

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserBlockingComponent>,
    public readManagerService: ReadManagerService
  ) {
    data = data.di;

    this.form = fb.group({
      id: data.id || 0,
      ip: data.ip || '',
      subnet: data.subnet || '',
      isSafe: data.isSafe || false,
      isV6: data.isV6 || false,
      userId: data.userId || '',
      isNew: data.isNew
    })
  }
  async save() {
    if (!this.readManagerService.verificationBlockOrSafeIP(this.form.value))
      return;

    if (!await this.readManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AddIpFilter, this.form.value))
      return;

    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
  classWrapper = async () => {
    this.userAllDictionary = await this.readManagerService.dictionaryWrapperService.getUserAllDictionary();
    // if deep copy not happenning then this dictionary will affected on allover of website
    if (this.userAllDictionary[0].id !== '')
      this.userAllDictionary.unshift({ id: '', title: 'فقط IP (بدون مقدار)', isSelected: true })
  }
  ngOnInit(): void {
    this.classWrapper();
  }

}
