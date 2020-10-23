import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IRoleManager } from './../../../Interfaces/irole-manager';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  addNew: IRoleManager = {
    id: 0,
    title: '',
    titleUnicode: '',
    isActive: false,
    needDeviceIdLogin: false
  }
  selectedValue: string;
  form: FormGroup;
  // description: string;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNewComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    // this.description = data.description;
  }
  save() {
    this.dialogRef.close(this.form.value);
    // console.log(data);
    
    
  }

  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    // console.log(this.description, '', this.fb, this.dialogRef);

    // this.form = this.fb.group({
    //   description: [this.description, []]
    // });
  }

}
