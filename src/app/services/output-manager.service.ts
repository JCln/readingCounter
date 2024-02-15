import { DateJalaliService } from './date-jalali.service';
import 'jspdf-autotable';

import { Injectable } from '@angular/core';
import { ENExportTableTranslationName, EN_messages } from 'interfaces/enums.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { jsPDF } from 'jspdf';
import * as ExcelJs from "exceljs/dist/exceljs.min.js";

import { font } from '../../assets/pdfjs/BLotus-normal';
import { MathS } from '../classes/math-s';
import { UtilsService } from './utils.service';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOutputConfig, ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class OutputManagerService {
  private readonly _exportType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private readonly contentDisposition = 'content-disposition';
  private readonly excelType = 'xlsx';

  constructor(
    private utilsService: UtilsService,
    private dateJalaliService: DateJalaliService,
    private profileService: ProfileService
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
  getFileNameFromHeader(disposition: string): string {
    const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)(?:; ?|$)/i;
    const asciiFilenameRegex = /^filename=(["']?)(.*?[^\\])\1(?:; ?|$)/i;

    let fileName: string = null;
    if (utf8FilenameRegex.test(disposition)) {
      fileName = decodeURIComponent(utf8FilenameRegex.exec(disposition)[1]);
    } else {
      // prevent ReDos attacks by anchoring the ascii regex to string start and
      //  slicing off everything before 'filename='
      const filenameStart = disposition.toLowerCase().indexOf('filename=');
      if (filenameStart >= 0) {
        const partialDisposition = disposition.slice(filenameStart);
        const matches = asciiFilenameRegex.exec(partialDisposition);
        if (matches != null && matches[2]) {
          fileName = matches[2];
        }
      }
    }
    return fileName;
  }
  // Exports
  downloadFileWithContentDisposition(data: any) {
    const fileName = this.getFileNameFromHeader(data.headers.get(this.contentDisposition));

    import("file-saver").then(FileSaver => {
      const blob = new Blob([data.body], { type: data.body.type });
      FileSaver.saveAs(blob, fileName);
    })
  }
  downloadFile(data: any, type: string) {
    const downloadURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = `${new Date().toLocaleDateString() + type}`;
    link.click();
  }
  getValidatedTableData = (dataSource: any[], _selectCols: any[], outputConfig: IOutputConfig, isPdf: boolean): any => {
    const colnames = _selectCols.map(c => ({ name: c.field, header: c.header, sel: c.isSelected }));
    const validColNames = [];
    const validHeaders = [];
    const firstItem = dataSource[0];

    const keys = Object.keys(firstItem);
    for (let j = 0; j < colnames.length; j++) {
      const colName = colnames[j].name;

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (outputConfig.canShowCurrentTable ? key === colName : key === colName && colnames[j].sel) {
          validColNames.push(colName);
          validHeaders.push(isPdf ? colnames[j].header : { name: colnames[j].header, style: { font: { name: outputConfig.defaultFontFamily } } });
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

  isNullData = (dataSource: any): boolean => {
    if (MathS.isNull(dataSource)) {
      this.utilsService.snackBarMessageWarn(EN_messages.notFoundToExport);
      return false;
    }
    return true;
  }
  getPerfectDataSource = (dataSource: any, outputConfig: any): any => {
    if (outputConfig.shouldFilteredValue) {
      if (!!dataSource.filteredValue) { // there is sth to filter && dataSource is exsiting
        return dataSource.filteredValue;
      }
      else {
        return dataSource._value;
      }
    }
    else {
      return dataSource._value;
    }
  }
  private makePDF = async (datas: any, fileName: string) => {
    const doc = new jsPDF('landscape');

    (doc as any).addFileToVFS('Blotus.ttf', font);//font should be ttf
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
    const toExportFileName = ENExportTableTranslationName[fileName] ? ENExportTableTranslationName[fileName] : fileName;
    doc.save(toExportFileName + this.dateJalaliService.getGregorianDate());
  }
  private makeEXCEL = (datas: any, outputConfig: IOutputConfig, fileName: string) => {
    const workbook = new ExcelJs.Workbook();
    const viewsConfig = outputConfig.shouldFreezeHeader ? { state: 'frozen', ySplit: 1, rightToLeft: true } : { rightToLeft: true }
    const worksheet = workbook.addWorksheet(
      "Sheet1",
      { views: [viewsConfig] }
    );
    worksheet.properties.defaultColWidth = outputConfig.defaultColWidth;

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

    worksheet.getRow(1).font = { name: outputConfig.defaultFontFamily, size: 14, color: { argb: 'ffffff' } };//wrapText: true    , bold: true

    for (let rowIndex = 2; rowIndex <= worksheet.rowCount; rowIndex++) {
      worksheet.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center' };//wrapText: true
    }

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
      a.download = toExportFileName + this.dateJalaliService.getGregorianDate(), this.excelType;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }
  EXPORT = async (dataSource: any, _selectCols: IObjectIteratation[], fileName: string, routerLink: string, isPdf: boolean) => {
    /* TO CREATE DEEP COPY */
    if (!this.isNullData(dataSource))
      return;

    const outputConfig = this.profileService.getOutputConfigs();

    _selectCols = outputConfig.canShowCurrentTable ? dataSource._columns : _selectCols;
    // getPerfectDataSource will overwrite dataSource, which mean it have only the dataSource value so must be after any configurations
    dataSource = this.getPerfectDataSource(dataSource, outputConfig);

    if (!this.isNullData(dataSource))
      return;

    if (!await this.canIDownloadMore(routerLink, dataSource.length))
      return;

    const datas = this.getValidatedTableData(dataSource, _selectCols, outputConfig, isPdf);
    isPdf ?
      this.makePDF(datas, fileName) :
      this.makeEXCEL(datas, outputConfig, fileName)
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

}
