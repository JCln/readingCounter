import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EN_messages } from 'interfaces/enums.enum';

import { AddNewComponent } from '../add-new/add-new.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  delete = {
    id: 0,
    title: '',
    titleUnicode: '',
    isActive: false,
    needDeviceIdLogin: false
  }
  selectedValue: string;
  form: FormGroup;
  deleteMessage: EN_messages.confirm_remove;

  save() {
    this.dialogRef.close(this.form.value);
    console.log(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNewComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
  }

}
