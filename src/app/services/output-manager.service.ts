import 'rxjs';

import { Injectable } from '@angular/core';

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
  ) { }

  get getDBFOutPut(): IOutputManager {
    return this.dbfOutput;
  }

  checkVertification = (val: IOutputManager): boolean => {
    if (this.utilsService.isNullTextValidation(val.fromDate)) {
      this.utilsService.snackBarMessageWarn('مقدار از تاریخ را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNullTextValidation(val.toDate)) {
      this.utilsService.snackBarMessageWarn('مقدار تا تاریخ را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای انتخاب نشده است');
      return false;
    }
    return true;
  }
  downloadFile(data: any, type: string) {
    const downloadURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = `${new Date().toLocaleDateString() + type}`;
    link.click();
  }
  // Exports
  // exportPdf() {
  //   import('jspdf').then(jsPDF => {
  //     import("jspdf-autotable").then(x => {
  //       const doc = new jsPDF.default(0, 0);
  //       doc.autoTable(this.exportColumns, this.products);
  //       doc.save('products.pdf');
  //     })
  //   })
  // }

  // exportExcel() {
  //   import("xlsx").then(xlsx => {
  //     const worksheet = xlsx.utils.json_to_sheet(this.products);
  //     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     this.saveAsExcelFile(excelBuffer, "products");
  //   });
  // }
  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   import("file-saver").then(FileSaver => {
  //     let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //     let EXCEL_EXTENSION = '.xlsx';
  //     const data: Blob = new Blob([buffer], {
  //       type: EXCEL_TYPE
  //     });
  //     FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  //   });
  // }
}
