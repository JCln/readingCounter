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
  description: string;


  foods = [
    { value: 'steak-0', viewValue: '1' },
    { value: 'pizza-1', viewValue: '2' },
    { value: 'tacos-2', viewValue: '3' }
  ];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNewComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.description = data.description;
  }
  save() {
    this.dialogRef.close(this.form.value);
    console.log(this.form.value);
    
  }

  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log(this.description, '', this.fb, this.dialogRef);

    this.form = this.fb.group({
      description: [this.description, []]
    });
  }

}
