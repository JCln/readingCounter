import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormulasService } from 'src/app/services/formulas.service';

@Component({
  selector: 'app-add-excel-file',
  templateUrl: './add-excel-file.component.html',
  styleUrls: ['./add-excel-file.component.scss']
})
export class AddExcelFileComponent implements OnInit {
  @ViewChild("screenshotInput") screenshotInput: ElementRef | null = null;
  choosenFileName: string = '';

  uploadForm: any = {
    rows: null,
    file: File
  }
  fileNameAfterChoose: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddExcelFileComponent>,
    private formulasService: FormulasService
  ) { }

  ngOnInit(): void {
  }
  onChange(event) {
    const a = document.getElementById('files') as any;
    this.choosenFileName = a.files.item(0).name;
    FileList = event.target.files;
  }
  uploadFile = (form: NgForm) => {
    if (!this.screenshotInput) {
      throw new Error("this.screenshotInput is null.");
    }

    const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
    if (!fileInput.files) {
      return;
    }

    if (!this.formulasService.checkVertitication(fileInput.files, form.value))
      return;

    this.dialogRef.close(true);
  }
  closeDialog = () => this.dialogRef.close();

}
