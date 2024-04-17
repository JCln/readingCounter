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
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-rr-locked',
  templateUrl: './rr-locked.component.html',
  styleUrls: ['./rr-locked.component.scss'],
  animations: [transitionAnimation]
})
export class RrLockedComponent extends AllListsFactory {
  provinceHierarchy: IProvinceHierarchy[] = [];
  deleteDictionary: IDictionaryManager[] = [];
  highLowStateDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];
  counterStateByCodeDictionary: IDictionaryManager[] = [];
  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
selectedZoneIds= [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public dialogService: DialogService,
    public closeTabService: CloseTabService,
    public listManagerService: ListManagerService
  ) {
    super(dialogService, listManagerService);
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.verification();
    }
    if (this.closeTabService.saveDataForRRLocked) {
      this.converts();
    }
    this.closeTabService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
  }
  converts = async () => {
    const tempZone: number = parseInt(this.closeTabService.saveDataForRRLocked[0].zoneId.toString());
    this.counterStateDictionary = await this.readingReportManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(tempZone);
    this.counterStateByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getCounterStateByCodeDictionary(tempZone);
    this.deleteDictionary = this.listManagerService.getDeleteDictionary();
    this.highLowStateDictionary = this.listManagerService.getHighLowDictionary();
    this.karbariDictionaryCode = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.readingReportManagerService.dictionaryWrapperService.getQotrDictionary();


    this.closeTabService.saveDataForRRLocked =
      Converter.convertIdsToTitles(
        this.closeTabService.saveDataForRRLocked,
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
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRLocked, this.karbariDictionaryCode, 'karbariCode');
    this.listManagerService.setDynamicPartRanges(this.closeTabService.saveDataForRRLocked);
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.readingPeriodDictionary = [];
    this.closeTabService.lockedReq.readingPeriodId = null;
    this.closeTabService.lockedReq._selectedKindId = null;
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.lockedReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.lockedReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.lockedReq._selectedKindId);
  }
  callAPI = async () => {
    this.closeTabService.saveDataForRRLocked = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListRRLocked, this.closeTabService.lockedReq);
    this.closeTabService.makeHadPicturesToBoolean(this.closeTabService.saveDataForRRLocked);
    this.converts();
  }
  verification = async () => {
    this.closeTabService.lockedReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.lockedReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.callAPI();
  }

}
