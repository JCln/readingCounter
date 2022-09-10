import 'jspdf-autotable';

import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

import { font } from '../../assets/pdfjs/BLotus-normal';
import { MathS } from '../classes/math-s';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class OutputManagerService {

  constructor(
    private utilsService: UtilsService
  ) {
  }

  // Exports
  downloadFile(data: any, type?: string) {
    if (type) {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = `${new Date().toLocaleDateString() + type}`;
      link.click();
      return;
    }
    const fileName = data.headers.get('content-disposition').split('filename=')[1].split(';')[0]
    import("file-saver").then(FileSaver => {
      const blob = new Blob([data.body], { type: data.body.type });
      console.log(blob);
      FileSaver.saveAs(blob, fileName);
    })
  }
  getValidatedTableData = (dataSource: any[], _selectCols: any[]): any => {
    const colnames = _selectCols.map(c => ({ name: c.field, header: c.header, sel: c.isSelected }));
    const validColNames = [];
    const validHeaders = [];
    const firstItem = dataSource[0];

    const keys = Object.keys(firstItem);
    for (let j = 0; j < colnames.length; j++) {
      const colName = colnames[j].name;

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (key === colName && colnames[j].sel) {
          validColNames.push(colName);
          validHeaders.push(colnames[j].header);
        }
      }
    }

    const newData = dataSource.map(function (currentelement) {
      const newElement = {};
      for (let i = 0; i < validColNames.length; i++) {
        const key = validColNames[i];
        let value = currentelement[validColNames[i]];

        if (value == true)
          value = 'بله';
        if (value == false)
          value = 'خیر';

        newElement[key] = value != undefined && value != null ? value : '';
      }
      return Object.values(newElement);
    });

    return { data: newData, headers: validHeaders };
  }
  exportPDF = (dataSource: any[], _selectCols: IObjectIteratation[], fileName: string) => {
    /* TO CREATE DEEP COPY */
    if (!this.isNullData(dataSource))
      return;

    const datas = this.getValidatedTableData(dataSource, _selectCols);

    const doc = new jsPDF('landscape');

    (doc as any).addFileToVFS('Blotus.ttf', font);
    doc.addFont('Blotus.ttf', 'font', 'normal');

    doc.setFont('font'); // set font    

    (doc as any).autoTable(
      {
        body: datas.data,
        head: [datas.headers],
        styles: {
          font: 'font',
          fillColor: [233, 236, 239],
          fontSize: 12
        },
        headStyles: {
          font: 'font',
          fillColor: [0, 69, 203],
          textColor: [255, 255, 255],
          fontSize: 14

        },
        showHead: 'everyPage',
        margin: { top: 10 },
        theme: 'striped',
        didDrawPage: (dataArg) => {
          doc.text('PAGE', dataArg.settings.margin.left, 10);
        }
      }
    )
    const customDate = new Date();
    doc.save(customDate.getFullYear() + '' + customDate.getDay() + '' + customDate.getDate() + fileName);
  }

  isNullData = (dataSource: any): boolean => {
    if (MathS.isNull(dataSource)) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFoundToExport);
      return false;
    }
    return true;
  }
  export = (dataSource: any, _selectCols: IObjectIteratation[], fileName: string, type: XLSX.BookType) => {
    /* TO CREATE DEEP COPY */
    if (!this.isNullData(dataSource))
      return;

    const datas = this.getValidatedTableData(dataSource, _selectCols);

    const worksheet = XLSX.utils.json_to_sheet(datas.data);
    var range = XLSX.utils.decode_range(worksheet['!ref']);

    for (var C = range.s.r; C <= range.e.c; ++C) {
      var address = XLSX.utils.encode_col(C) + "1"; // <-- first row, column number C
      if (!worksheet[address]) continue;
      worksheet[address].v = datas.headers[C];
    }
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: type, type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName, '.' + type);
  }
  saveAsExcelABuffer = (buffer: any, name: string) => {
    console.log(buffer);
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, name);
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
