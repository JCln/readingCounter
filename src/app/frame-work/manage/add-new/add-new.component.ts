import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent {
  private messageToShow = {
    title: '',
    messageOne: '',
    messageTwo: '',
    messageThree: '',
    imgOne: '',
    imgTwo: ''
  }

  constructor(
    private dialogRef: MatDialogRef<AddNewComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: any
  ) {
    this.messageToShow.title = data.title;
    this.messageToShow.messageOne = data.messageOne;
    this.messageToShow.messageTwo = data.messageTwo;
    this.messageToShow.messageThree = data.messageThree;
    this.messageToShow.imgOne = data.imgOne;
    this.messageToShow.imgTwo = data.imgTwo;
  }

  close() {
    this.dialogRef.close();
  }

}
