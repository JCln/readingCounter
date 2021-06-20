import 'jspdf-autotable';

import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

import { font } from '../../assets/pdfjs/BLotus-normal';
import { EN_messages } from '../Interfaces/enums.enum';
import { IDictionaryManager, IObjectIteratation } from '../Interfaces/ioverall-config';
import { IOutputManager } from './../Interfaces/imanage';
import { ConverterService } from './converter.service';
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
    private utilsService: UtilsService,
    private converterService: ConverterService
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
    const contentDis = data.headers.get('content-disposition');
    console.log(contentDis);

    const contentType = data.headers.get('content-type');
    console.log(contentType);

    const downloadURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = `${new Date().toLocaleDateString() + type}`;
    link.click();
  }
  exportPDF = (dataSource: any[], _selectCols: IObjectIteratation[], fileName: string) => {
    /* TO CREATE DEEP COPY */
    let originDataSource = JSON.parse(JSON.stringify(dataSource));
    if (this.utilsService.isNull(originDataSource)) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFoundToExport);
      return;
    }
    let head = [];
    let tempDataSource = [];
    originDataSource.forEach(item => {
      if (item.hasOwnProperty('id'))
        delete item.id;
      if (item.hasOwnProperty('counterReaderId'))
        delete item.counterReaderId;
      if (item.hasOwnProperty('zoneId'))
        delete item.zoneId;
      if (item.hasOwnProperty('year'))
        delete item.year;
      if (item.hasOwnProperty('hasPreNumber'))
        delete item.hasPreNumber;
      if (item.hasOwnProperty('displayBillId'))
        delete item.displayBillId;
      if (item.hasOwnProperty('displayRadif'))
        delete item.displayRadif;
      if (item.hasOwnProperty('isBazdid'))
        delete item.isBazdid;
      if (item.hasOwnProperty('isRoosta'))
        delete item.isRoosta;
      if (item.hasOwnProperty('address'))
        delete item.address;
      if (item.hasOwnProperty('possibleSaierOrAbBaha'))
        delete item.possibleSaierOrAbBaha;
      if (item.hasOwnProperty('counterSerial'))
        delete item.counterSerial;
      if (item.hasOwnProperty('possibleCounterSerial'))
        delete item.possibleCounterSerial;
      if (item.hasOwnProperty('possibleAddress'))
        delete item.possibleAddress;
      tempDataSource.push(Object.values(item));
      head.push(Object.keys(item));
    })

    tempDataSource.forEach(item => {
      item = item.toString();
    })
    head = head[0];
    let tempHeadTest = [];

    head.forEach(tempHead => {
      _selectCols.find(item => {
        if (item.field === tempHead) {
          tempHeadTest.push(item.header);
        }
      })
    })

    const doc = new jsPDF('landscape');

    (doc as any).addFileToVFS('Blotus.ttf', font);
    doc.addFont('Blotus.ttf', 'font', 'normal');

    doc.setFont('font'); // set font    

    (doc as any).autoTable(
      {
        body: tempDataSource,
        head: [tempHeadTest],
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
  deleteForExcel = (originDataSource: any) => {
    originDataSource.forEach(item => {
      if (item.hasOwnProperty('id'))
        delete item.id;
      if (item.hasOwnProperty('counterReaderId'))
        delete item.counterReaderId;
      if (item.hasOwnProperty('zoneId'))
        delete item.zoneId;
      if (item.hasOwnProperty('year'))
        delete item.year;
      if (item.hasOwnProperty('hasPreNumber'))
        delete item.hasPreNumber;
      if (item.hasOwnProperty('stateTitle'))
        delete item.stateTitle;
    })
  }
  isNullData = (dataSource: any): boolean => {
    if (this.utilsService.isNull(dataSource)) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFoundToExport);
      return false;
    }
    return true;
  }
  export = (dataSource: any, _selectCols: IObjectIteratation[], fileName: string, type: XLSX.BookType) => {
    /* TO CREATE DEEP COPY */
    if (!this.isNullData(dataSource))
      return;

    let originDataSource = JSON.parse(JSON.stringify(dataSource));
    this.deleteForExcel(originDataSource);
    const worksheet = XLSX.utils.json_to_sheet(originDataSource);
    var range = XLSX.utils.decode_range(worksheet['!ref']);
    for (var C = range.s.r; C <= range.e.r; ++C) {
      var address = XLSX.utils.encode_col(C) + "1"; // <-- first row, column number C
      if (!worksheet[address]) continue;
      _selectCols.find(item => {
        if (item.field === worksheet[address].v) {
          worksheet[address].v = item.header;
        }
      })
    }
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: type, type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName, '.' + type);
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
  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
    this.converterService.convertIdToTitle(dataSource, dictionary, toConvert);
  }

}
