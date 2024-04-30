import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { TreeSelect } from 'primeng/treeselect';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [transitionAnimation]
})
export class DetailsComponent extends FactoryONE {
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;
  selectedZoneIds = [];
  provinceHierarchy: IProvinceHierarchy[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  karbariByCodeDictionary: IDictionaryManager[] = [];
  fragmentByZoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];


  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  insertToAuxZoneid = () => {
    this.closeTabService.saveDataForRRDetails.forEach(item => {
      item.changableZoneId = item.zoneId;
    })
  }
  getFragmentByZone = async () => {
    if (this.myTreeSelect.value)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.getFragmentMastersInZones(this.myTreeSelect.value);
  }
  classWrapper = async () => {
    this.closeTabService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    console.log(this.provinceHierarchy);

    this.getReadingPeriod();
    this.getFragmentByZone();
  }
  afterPeriodChanged() {
    this.readingPeriodDictionary = [];
    this.closeTabService.detailsReq.readingPeriodId = null;
  }
  getReadingPeriod = async () => {
    if (this.closeTabService.detailsReq._selectedKindId)
      this.readingPeriodDictionary = await this.readingReportManagerService.dictionaryWrapperService.getReadingPeriodDictionary(this.closeTabService.detailsReq._selectedKindId);
  }
  verification = async () => {
    this.closeTabService.detailsReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.detailsReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.callAPI();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForRRDetails = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ReadingReportDETAILSWithParam, this.closeTabService.detailsReq);
    this.karbariByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
    this.insertToAuxZoneid();
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRDetails, this.karbariByCodeDictionary, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRDetails, this.karbariByCodeDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRDetails, this.zoneDictionary, 'changableZoneId');
  }

}
