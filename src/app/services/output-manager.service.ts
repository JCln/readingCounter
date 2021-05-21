import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as XLSX from 'xlsx';

import { EN_messages } from '../Interfaces/enums.enum';
import { IOutputManager } from './../Interfaces/imanage';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class OutputManagerService {
  fileUrl;
  dbfOutput: IOutputManager = {
    zoneId: 0,
    fromDate: null,
    toDate: null
  };

  constructor(
    private utilsService: UtilsService
  ) {
  }

  get getDBFOutPut(): IOutputManager {
    return this.dbfOutput;
  }

  checkVertification = (val: IOutputManager): boolean => {
    if (this.utilsService.isNullTextValidation(val.fromDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (this.utilsService.isNullTextValidation(val.toDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }
    if (this.utilsService.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    return true;
  }
  // Exports

  downloadFile(data: any, type: string) {
    const downloadURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = `${new Date().toLocaleDateString() + type}`;
    link.click();
  }
  exportPdf = (name: any[], fileName: string) => {
    if (this.utilsService.isNull(name)) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFoundToExport);
      return;
    }
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

    var fila = new Array();
    name.map((item) => {
      fila.push(Object.values(item))
    })
    const definition = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 2,
            body: fila,
          },
          styles: {
            header: { fontSize: 16, bold: true, alignment: 'center' },
            tableHeader: { fillColor: '#29517c', color: 'white' }
          }
        }
      ]
    }

    const date = new Date();
    pdfMake.createPdf(definition).download(date.getDay() + date.getMonth() + fileName);

  }
  exportExcel(dataSource: any, fileName: string) {
    if (this.utilsService.isNull(dataSource)) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFoundToExport);
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName, '.xlsx');
  }
  exportCSV(dataSource: any, fileName: string) {
    if (this.utilsService.isNull(dataSource)) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFoundToExport);
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName, '.csv');
  }
  saveAsExcelABuffer = (buffer: any) => {
    console.log(buffer);
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, 'testName');
    })
  }
  saveAsExcelFile(buffer: any, fileName: string, EXCEL_EXTENSION: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      console.log(data);

      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
}
