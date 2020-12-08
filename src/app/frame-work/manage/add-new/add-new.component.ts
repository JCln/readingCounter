import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  selectedValue: string;
  form: FormGroup;
  // description: string;

  constructor(

    private dialogRef: MatDialogRef<AddNewComponent>) {
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
