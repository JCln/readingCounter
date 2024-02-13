import { Component, ElementRef, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IFileExcelReq } from 'interfaces/import-data';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { OutputManagerService } from 'services/output-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-excel-file',
  templateUrl: './excel-file.component.html',
  styleUrls: ['./excel-file.component.scss']
})
export class ExcelFileComponent extends FactoryONE {
  @ViewChild("screenshotInput") screenshotInput: ElementRef | null = null;
  choosenFileName: string = '';
  fileNameAfterChoose: string = '';
  _canShowAddButton: boolean = true;

  _showAlalHesabPercent: boolean = false;
  _showimagePercent: boolean = false;
  kindId: number = 0;
  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  readingConfigDefault: IReadingConfigDefault;
  userCounterReader: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public importDynamicService: ImportDynamicService,
    public closeTabService: CloseTabService,
    private outputManagerService: OutputManagerService
  ) {
    super();
  }

  connectToServer = async () => {
    if (!MathS.isNull(this.closeTabService.saveDataForImportDataFileExcelReq.zoneId)) {

      if (this.importDynamicService.verificationReadingConfigDefault(this.readingConfigDefault, this.closeTabService.saveDataForImportDataFileExcelReq)) {
        console.log(this.closeTabService.saveDataForImportDataFileExcelReq);
        const validation = this.importDynamicService.checkExcelFileVertification(this.closeTabService.saveDataForImportDataFileExcelReq);
        if (validation) {
          this.uploadFile(this.closeTabService.saveDataForImportDataFileExcelReq);
          // this._canShowAddButton = false;
        }
      }
    }
    else {
      this.importDynamicService.snackMessage(EN_messages.insert_zone);
    }
  }
  private insertReadingConfigDefaults = (rcd: any) => {
    this.closeTabService.saveDataForImportDataFileExcelReq.displayBillId = rcd.displayBillId ? rcd.displayBillId : false;
    this.closeTabService.saveDataForImportDataFileExcelReq.displayRadif = rcd.displayRadif ? rcd.displayRadif : false;
    this.closeTabService.saveDataForImportDataFileExcelReq.displayPreDate = rcd.displayPreDate ? rcd.displayPreDate : false;
    this.closeTabService.saveDataForImportDataFileExcelReq.displayMobile = rcd.displayMobile ? rcd.displayMobile : false;
    this.closeTabService.saveDataForImportDataFileExcelReq.hasImage = rcd.hasImage ? rcd.hasImage : false;
    this.closeTabService.saveDataForImportDataFileExcelReq.displayDebt = rcd.displayDebt ? rcd.displayDebt : false;
    this.closeTabService.saveDataForImportDataFileExcelReq.displayIcons = rcd.displayIcons ? rcd.displayIcons : false;
    this.closeTabService.saveDataForImportDataFileExcelReq.hasPreNumber = rcd.defaultHasPreNumber;
    this.closeTabService.saveDataForImportDataFileExcelReq.imagePercent = rcd.defaultImagePercent;
    this.closeTabService.saveDataForImportDataFileExcelReq.alalHesabPercent = rcd.defaultAlalHesab;
    this._showimagePercent = true;
    this._showAlalHesabPercent = true;
  }
  verificationACounterReaderId = async () => {
    if (!MathS.isNull(this.closeTabService.saveDataForImportDataFileExcelReq.zoneId)) {

      this.readingConfigDefault = await this.importDynamicService.dictionaryWrapperService.getReadingConfigDefaultByZoneIdDictionary(this.closeTabService.saveDataForImportDataFileExcelReq.zoneId);

      this.verificationReadingPeriod();
      this.userCounterReader = await this.importDynamicService.dictionaryWrapperService.getUserCounterReaderDictionary(this.closeTabService.saveDataForImportDataFileExcelReq.zoneId);

      this.insertReadingConfigDefaults(this.readingConfigDefault);
    }
  }
  verificationReadingPeriod = async () => {
    if (this.closeTabService.saveDataForImportDataFileExcelReq.zoneId || this.kindId) {
      this.readingPeriodDictionary = await this.importDynamicService.dictionaryWrapperService.getReadingPeriodDictionaryByZoneAndKind(this.closeTabService.saveDataForImportDataFileExcelReq.zoneId, this.kindId);
    }
  }
  nullSavedSource = () => this.closeTabService.saveDataForImportDataFileExcel = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.readingPeriodKindsDictionary = await this.importDynamicService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.importDynamicService.dictionaryWrapperService.getZoneDictionary();
    this.verificationACounterReaderId();
  }

  onChange(event) {
    const a = document.getElementById('files') as any;
    this.choosenFileName = a.files.item(0).name;
    FileList = event.target.files;
  }
  uploadFile = (form: IFileExcelReq) => {
    if (!this.screenshotInput) {
      throw new Error("this.screenshotInput is null.");
    }

    const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
    if (fileInput.files) {
      if (this.importDynamicService.verificationExcelFile(fileInput.files)) {
        this.importDynamicService.postExcelFile(ENInterfaces.postImportDataFileExcel, form, fileInput.files);
      }
    }
  }
  getExcelSample = async () => {
    this.outputManagerService.saveAsExcelABuffer(await this.importDynamicService.ajaxReqWrapperService.getBlob(ENInterfaces.getImportDataFileExcelSample), 'importDataFSample');
  }

}