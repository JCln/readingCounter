import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
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
  provinceHierarchy: IProvinceHierarchy[] = [];
  // provinceHierarchy = {
  //   key: '0',
  //   label: 'تهران',
  //   data: 'Documents Folder',
  //   icon: 'pi pi-fw pi-inbox',
  //   children: [
  //     {
  //       key: '0-0',
  //       label: 'منطقه1',
  //       data: 'Work Folder',
  //       icon: 'pi pi-fw pi-cog',
  //       children: [
  //         { key: 'افجه', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
  //         { key: 'لاطره', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
  //       ]
  //     },
  //     {
  //       key: '0-1',
  //       label: 'منطقه 2',
  //       data: 'Home Folder',
  //       icon: 'pi pi-fw pi-home',
  //       children: [
  //         {
  //           key: '0-1-0',
  //           label: 'ناحیه 2',
  //           icon: 'pi pi-fw pi-file',
  //           data: 'Invoices for this month'
  //         }
  //       ]
  //     }
  //   ]
  // }
  // provinceHierarchy = [{
  //   data: 13,
  //   label: ' تهران',
  //   children: [
  //     {
  //       data: 1,
  //       label: ' لواسان',
  //       children: [
  //         {
  //           data: 1,
  //           label: ' افجه'
  //         }
  //       ]
  //     },
  //     {
  //       data: 1,
  //       label: ' منطقه 2',
  //       children: [
  //         {
  //           data: 1,
  //           label: ' ناحیه دو'
  //         },
  //         {
  //           data: 2,
  //           label: ' ناحیه دو-سه'
  //         }
  //       ]
  //     },
  //     {
  //       data: 1,
  //       label: ' منطقه سه',
  //       children: [
  //         {
  //           data: 1,
  //           label: ' ناحیه سه'
  //         }
  //       ]
  //     }
  //   ]
  // }]

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

  getFragmentByZone = async () => {
    if (this.closeTabService.detailsReq.zoneId)
      this.fragmentByZoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getFragmentMasterByZoneIdDictionary(this.closeTabService.detailsReq.zoneId);
  }
  classWrapper = async () => {
    this.closeTabService.getSearchInOrderTo();
    this.readingPeriodKindDictionary = await this.readingReportManagerService.dictionaryWrapperService.getPeriodKindDictionary();
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();    
    this.getReadingPeriod();
    this.getFragmentByZone();
  }
  afterZoneChanged() {
    // TODO: CLEAR period dictionaries and selected periodId and kindId values
    this.closeTabService.detailsReq.fragmentMasterIds = [];
    this.readingPeriodDictionary = [];
    this.closeTabService.detailsReq.readingPeriodId = null;
    this.closeTabService.detailsReq._selectedKindId = null;
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
    this.closeTabService.detailsReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.closeTabService.detailsReq.selectedZoneIds);
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.detailsReq, this.closeTabService._isOrderByDate);
    if (temp)
      this.callAPI();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForRRDetails = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ReadingReportDETAILSWithParam, this.closeTabService.detailsReq);
    this.karbariByCodeDictionary = await this.readingReportManagerService.dictionaryWrapperService.getkarbariCodeDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRDetails, this.karbariByCodeDictionary, 'possibleKarbariCode');
    Converter.convertIdToTitle(this.closeTabService.saveDataForRRDetails, this.karbariByCodeDictionary, 'karbariCode');
  }

}
