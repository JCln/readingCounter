import { Component, ElementRef, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IFileExcelReq } from 'interfaces/import-data';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
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
  canShowEditButton: boolean = false;
  _years: ITitleValue[] = [];
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
    this.closeTabService.saveDataForImportDataFileExcelReq.hasPreNumber = rcd.defaultHasPreNumber;
    this.closeTabService.saveDataForImportDataFileExcelReq.displayBillId = rcd.displayBillId;
    this.closeTabService.saveDataForImportDataFileExcelReq.displayRadif = rcd.displayRadif;
    this.closeTabService.saveDataForImportDataFileExcelReq.imagePercent = rcd.defaultImagePercent;
    this.closeTabService.saveDataForImportDataFileExcelReq.alalHesabPercent = rcd.defaultAlalHesab;
    this._showimagePercent = true;
    this._showAlalHesabPercent = true;
  }
  private showEditButton = () => {
    if (this.readingConfigDefault)
      this.canShowEditButton = true;
  }
  verificationACounterReaderId = async () => {
    if (!MathS.isNull(this.closeTabService.saveDataForImportDataFileExcelReq.zoneId)) {

      this.readingConfigDefault = await this.importDynamicService.getReadingConfigDefaults(this.closeTabService.saveDataForImportDataFileExcelReq.zoneId);
      console.log(this.readingConfigDefault);

      this.verificationReadingPeriod();
      this.userCounterReader = await this.importDynamicService.getUserCounterReaders(this.closeTabService.saveDataForImportDataFileExcelReq.zoneId);

      this.insertReadingConfigDefaults(this.readingConfigDefault);
      this.showEditButton();
    }
  }
  verificationReadingPeriod = async () => {
    if (this.closeTabService.saveDataForImportDataFileExcelReq.zoneId || this.kindId) {
      this.readingPeriodDictionary = await this.importDynamicService.getReadingPeriod(this.closeTabService.saveDataForImportDataFileExcelReq.zoneId, this.kindId);
    }
  }
  nullSavedSource = () => this.closeTabService.saveDataForImportDataFileExcel = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.readingPeriodKindsDictionary = await this.importDynamicService.getReadingPeriodsKindDictionary();
    this.zoneDictionary = await this.importDynamicService.getZoneDictionary();
    this.verificationACounterReaderId();
    this._years = this.importDynamicService.getYears();
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
      console.log(fileInput.files);

      if (this.importDynamicService.verificationExcelFile(fileInput.files)) {
        this.importDynamicService.postExcelFile(ENInterfaces.postImportDataFileExcel, form, fileInput.files);
      }
    }
  }
  getExcelSample = async () => {
    this.outputManagerService.saveAsExcelABuffer(await this.importDynamicService.getExcelSample(ENInterfaces.getImportDataFileExcelSample), 'importDataFSample');
  }

}