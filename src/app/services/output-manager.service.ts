import { DateJalaliService } from './date-jalali.service';
import 'jspdf-autotable';

import { Injectable } from '@angular/core';
import { ENExportTableTranslationName, EN_messages } from 'interfaces/enums.enum';
import { BookType, IObjectIteratation } from 'interfaces/ioverall-config';
import { jsPDF } from 'jspdf';
import * as ExcelJs from "exceljs/dist/exceljs.min.js";

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

  constructor(
    private utilsService: UtilsService,
    private dateJalaliService: DateJalaliService
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
  getValidatedTableDataExcelJs = (dataSource: any[], _selectCols: any[]): any => {
    const colnames = _selectCols.map(c => ({ name: c.field, header: c.header, sel: c.isSelected }));
    const validColNames = [];
    const validHeaders: any[] = [];
    const firstItem = dataSource[0];

    const keys = Object.keys(firstItem);
    for (let j = 0; j < colnames.length; j++) {
      const colName = colnames[j].name;

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (key === colName && colnames[j].sel) {
          validColNames.push(colName);
          validHeaders.push({ name: colnames[j].header });
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
  export = async (dataSource: any, _selectCols: IObjectIteratation[], fileName: string, type: BookType, routerLink: string, count: number) => {
    if (!await this.canIDownloadMore(routerLink, count))
      return;

    /* TO CREATE DEEP COPY */
    if (!this.isNullData(dataSource))
      return;
    const datas = this.getValidatedTableDataExcelJs(dataSource, _selectCols);
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet(
      "Sheet1",
      { views: [{ state: 'frozen', ySplit: 1, rightToLeft: true }] }
    );
    worksheet.properties.defaultColWidth = 13;

    // TABLE
    worksheet.addTable({
      name: 'MyTable',
      ref: 'A1',
      headerRow: true,
      // style: {
      //   theme: 'TableStyleMedium2',
      //   showRowStripes: false,
      // },
      columns: datas.headers,
      rows: datas.data
    });
    let rowIndex = 1;
    for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
      worksheet.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center' };//wrapText: true
    }

    worksheet.getColumn(1).font = { name: 'B Koodak' }
    worksheet.getColumn(2).font = { name: 'B Koodak' }
    // const column = table.getColumn(1);
    console.log(worksheet.getColumn(1));
    console.log(worksheet._columns.length);
    // for (let colIndex = 1; colIndex <= worksheet._columns.length; colIndex++) {
    //   worksheet.getColumn(colIndex).style = { font: { name: 'B Koodak' } };          
    // }
    worksheet.getRow(1).font = { name: 'B Koodak', size: 14, color: { argb: 'ffffff' }, bold: true };//wrapText: true    

    const toExportFileName = ENExportTableTranslationName[fileName] ? ENExportTableTranslationName[fileName] : fileName;
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type:
          this._exportType
      });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("style", "display: none");
      a.href = url;
      a.download = toExportFileName + this.dateJalaliService.getGregorianDate(), '.' + type;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
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
