import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IObjectIteratation, ISearchInOrderTo } from 'interfaces/ioverall-config';
import { IFollowUp, IFollowUpHistory } from 'interfaces/isearchs';
import { IOffLoadPerDay } from 'interfaces/itrackings';
import { EN_Routes } from 'interfaces/routes.enum';
import { CloseTabService } from 'services/close-tab.service';
import { FollowUpService } from 'services/follow-up.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss'],
  animations: [transitionAnimation]
})
export class FollowUpComponent extends FactoryONE {
  shouldActive: boolean = false;
  _showDesc: IObjectIteratation[] = [];
  _showDescCheckboxes: IObjectIteratation[] = [];
  _defColumns: any[];
  _selectPerDayCountInfo: any[];
  private readonly listManagerPerdayFollowColumns: string = 'LMPerDayFollowUpPositions';
  private readonly followupViewColumns: string = 'followUpView';
  private readonly followupViewCheckboxesColumns: string = 'followUpViewCheckboxes';
  private readonly defColumns: string = 'defColumns';
  private readonly followUpCountInfo: string = 'followUpCountInfo';
  showInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'گراف',
      isSelected: true,
      key: 'Graph'
    },
    {
      title: 'جدول',
      isSelected: false,
      key: 'Table'
    }
  ]
  clonedProducts: { [s: string]: IFollowUpHistory; } = {};

  chartTemp: any[] = [];
  dataSourceAUX: IOffLoadPerDay;
  changeHsty: IFollowUpHistory[] = [];
  _selectColumnsAUX: IObjectIteratation[];


  constructor(
    public trackingManagerService: TrackingManagerService,
    public closeTabService: CloseTabService,
    private followUpService: FollowUpService
  ) {
    super();
    this.classWrapper();
  }
  getObjectParameters = (sth: any): any[] => {
    let b = [];
    this.closeTabService.saveDataForFollowUpAUX.unreadCounts = sth.overalCount - sth.readCount;
    b.push(sth.readCount); // all reads
    b.push(sth.overalCount - sth.readCount);// unreads
    return b;
  }
  doSth = () => {
    this.dataSourceAUX.alalHesabPercent = this.closeTabService.saveDataForFollowUp.alalHesabPercent;
    this._selectPerDayCountInfo = this.trackingManagerService.columnManager.getColumnsMenus(this.followUpCountInfo);
    this.chartTemp = this.getObjectParameters(this.closeTabService.saveDataForFollowUpAUX);
  }
  toPreStatus = async (dataSource: IFollowUpHistory) => {
    const config = {
      messageTitle: EN_messages.reason_backToPrev,
      text: 'ش پیگیری: ' + this.dataSourceAUX.trackNumber + '،   قرائت کننده: ' + dataSource.counterReaderName,
      minWidth: '19rem',
      isInput: true,
      isDelete: false,
      icon: 'pi pi-step-backward'
    }

    const a = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (a) {
      const res = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingPRE, { trackingId: dataSource.id, description: a });
      this.trackingManagerService.successSnackMessage(res.message);
    }
  }
  private makeConfigs = async () => {
    this.changeHsty = this.closeTabService.saveDataForFollowUp.changeHistory;
    this.getUserRole();
    this.insertToDesc();
  }
  connectToServer = async () => {
    if (this.trackingManagerService.verificationTrackNumber(this.closeTabService.saveDataForFollowUpReq.trackNumber)) {
      this.closeTabService.saveDataForFollowUp = await this.trackingManagerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.trackingFOLLOWUP, this.closeTabService.saveDataForFollowUpReq.trackNumber);
      // if (this.trackingManagerService.verificationService.isValidationNull(this.closeTabService.saveDataForFollowUp.))
      //   return;
      this.dataSourceAUX = await this.trackingManagerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.ListOffloadedPERDAY, this.closeTabService.saveDataForFollowUpReq.trackNumber.toString());
      this.closeTabService.saveDataForFollowUpAUX = this.dataSourceAUX;

      this.doSth();
      this.makeConfigs();
    }
  }
  classWrapper = async () => {
    /** 
     * it separate data from followUp service and 
     * simple search route,
     * it should first call check hasTrackNumber function
     * then data were saved     
     */
    if (this.followUpService.hasTrackNumber()) {
      this.closeTabService.saveDataForFollowUpReq.trackNumber = this.followUpService.getTrackNumber();
      this.connectToServer();
      this.followUpService.setTrackNumber(null);
      return;
    }
    if (this.closeTabService.saveDataForFollowUp.trackNumber) {
      this.dataSourceAUX = this.closeTabService.saveDataForFollowUpAUX;
      this.doSth();
      this.makeConfigs();
      return;
    }
  }
  onRowEditSave = async (dataSource: IFollowUpHistory) => {
    const res = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingEditState, { id: dataSource.id, seen: dataSource.seen });
    this.trackingManagerService.successSnackMessage(res.message);
    this.connectToServer();
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  getUserRole = (): void => {
    this.shouldActive = this.trackingManagerService.utilsService.getIsAdminRole();
  }
  clearUNUsables = () => {
    if (!this.shouldActive) {
      const c = this._defColumns.filter(item => {
        return item.field !== 'seen'
      })
      this._defColumns = c;
      return;
    }
  }
  insertToDesc = () => {
    if (this.dataSourceAUX) {
      this.trackingManagerService.setGetRanges(this.dataSourceAUX);
      this._selectColumnsAUX = this.trackingManagerService.columnManager.getColumnsMenus(this.listManagerPerdayFollowColumns);
    }
    this._showDesc = this.trackingManagerService.columnManager.getColumnsMenus(this.followupViewColumns);
    this._showDescCheckboxes = this.trackingManagerService.columnManager.getColumnsMenus(this.followupViewCheckboxesColumns);
    this._defColumns = this.trackingManagerService.columnManager.getColumnsMenus(this.defColumns);
    this.clearUNUsables();
  }
  showInMap = () => {
    this.trackingManagerService.routeToLMPDXY(this.closeTabService.saveDataForFollowUp.trackNumber, this.closeTabService.saveDataForFollowUp.changeHistory[this.changeHsty.length - 1].insertDateJalali, this.dataSourceAUX.overalDistance, true);
  }
  routeToLMAll = (row: IFollowUpHistory) => {
    row.listNumber = this.dataSourceAUX.listNumber;
    row.trackNumber = this.dataSourceAUX.trackNumber;
    row.zoneTitle = this.closeTabService.saveDataForFollowUp.zoneTitle;
    row.zoneId = this.closeTabService.saveDataForFollowUp.zoneId;

    this.trackingManagerService.routeToLMAll(row, EN_Routes.followUp);
  }
  ngOnInit(): void { return; }

}
