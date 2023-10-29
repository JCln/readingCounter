import 'jspdf-autotable';

import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

import { font } from '../../assets/pdfjs/BLotus-normal';
import { MathS } from '../classes/math-s';
import { UtilsService } from './utils.service';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Injectable({
  providedIn: 'root'
})
export class OutputManagerService {
  private readonly _exportType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private readonly contentDisposition = 'content-disposition';
  // XLSX = require('sheetjs-style'); to do recognize sheet styling

  constructor(
    private utilsService: UtilsService
  ) {
  }

  canIDownloadMore = async (url: string, count: number): Promise<boolean> => {
    const req = { url: url, count: count };
    const res = await this.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.downloadIOPolicyCanIDownloadMore, req);
    if (res) {
      return true;
    }
    const config = {
      messageTitle: EN_messages.downloadLimit,
      text: EN_messages.downloadLimitText,
      minWidth: '20rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-file-edit',
    }
    this.utilsService.firstConfirmDialog(config);
    return false;
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
    const fileName = data.headers.get(this.contentDisposition).split('filename=')[1].split(';')[0]
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

        newElement[key] = value != undefined && value != null ? value : '';
      }
      return Object.values(newElement);
    });

    return { data: newData, headers: validHeaders };
  }
  exportPDF = async (dataSource: any[], _selectCols: IObjectIteratation[], fileName: string, routerLink: string, count: number) => {
    if (!await this.canIDownloadMore(routerLink, count))
      return;

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
  export = async (dataSource: any, _selectCols: IObjectIteratation[], fileName: string, type: XLSX.BookType, routerLink: string, count: number) => {
    if (!await this.canIDownloadMore(routerLink, count))
      return;

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
    const workbook = {
      Views: [
        { RTL: true }
      ],
      Sheets: { 'data': worksheet },
      SheetNames: ['data'],
    };
    console.log(worksheet);

    // worksheet['A1'].v = {
    //   font: {
    //     name: "Calibri",
    //     sz: 24,
    //     bold: true,
    //     color: { rgb: "red" },
    //   },
    // };
    // worksheet['A1'].s = {
    //   font: {
    //     name: "Calibri",
    //     sz: 24,
    //     bold: true,
    //     color: { rgb: 'blue' },
    //   },
    // };
    const excelBuffer: any = XLSX.write(workbook, { bookType: type, type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName, '.' + type);
  }
  saveAsExcelABuffer = (buffer: any, name: string) => {
    console.log(buffer);
    import("file-saver").then(FileSaver => {
      const data: Blob = new Blob([buffer], {
        type: this._exportType
      });
      FileSaver.saveAs(data, name);
    })
  }
  saveAsExcelFile(buffer: any, fileName: string, EXCEL_EXTENSION: string): void {
    import("file-saver").then(FileSaver => {
      const data: Blob = new Blob([buffer], {
        type: this._exportType
      });
      console.log(data);

      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}
