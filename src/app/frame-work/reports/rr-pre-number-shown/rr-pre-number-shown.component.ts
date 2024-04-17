import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { TreeSelect } from 'primeng/treeselect';
import { CloseTabService } from 'services/close-tab.service';
import { ListManagerService } from 'services/list-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { AllListsFactory } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-rr-pre-number-shown',
  templateUrl: './rr-pre-number-shown.component.html',
  styleUrls: ['./rr-pre-number-shown.component.scss'],
  animations: [transitionAnimation]
})
export class RrPreNumberShownComponent extends AllListsFactory {
  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  provinceHierarchy: IProvinceHierarchy[] = [];

  highLowStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
  selectedZoneIds = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService,
    public dialogService: DialogService,
    public listManagerService: ListManagerService
  ) {
    super(dialogService, listManagerService);
  }

  classWrapper = async () => {
    if (!MathS.isNull(this.closeTabService.saveDataForRRPreNumShown)) {
      this.converts();
    }
    this.closeTabService.getSearchInOrderTo();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.preNumberShownReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.preNumberShownReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.preNumberShownReq._selectedKindId);
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRPreNumShown = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListRRPreNumberShown, this.closeTabService.preNumberShownReq);
    this.closeTabService.makeHadPicturesToBoolean(this.closeTabService.saveDataForRRPreNumShown);
    this.converts();
  }
  verification = async () => {
    this.closeTabService.preNumberShownReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.preNumberShownReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  converts = async () => {
    const tempZone: number = parseInt(this.closeTabService.saveDataForRRPreNumShown[0].zoneId.toString());
    this.counterStateDictionary = await this.readingReportManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(tempZone);
    this.counterStateByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getCounterStateByCodeDictionary(tempZone);
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
    this.karbariDictionaryCode = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.readingReportManagerService.dictionaryWrapperService.getQotrDictionary();

    this.closeTabService.saveDataForRRPreNumShown =
      Converter.convertIdsToTitles(
        this.closeTabService.saveDataForRRPreNumShown,
        {
          deleteDictionary: this.deleteDictionary,
          counterStateDictionary: this.counterStateDictionary,
          counterStateByCodeDictionary: this.counterStateByCodeDictionary,
          karbariDictionaryCode: this.karbariDictionaryCode,
          qotrDictionary: this.qotrDictionary
        },
        {
          hazf: 'hazf',
          counterStateId: 'counterStateId',
          preCounterStateCode: 'preCounterStateCode',
          possibleKarbariCode: 'possibleKarbariCode',
          qotrCode: 'qotrCode'
        })
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRPreNumShown, this.karbariDictionaryCode, 'karbariCode');
    this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForRRPreNumShown);
  }

}
