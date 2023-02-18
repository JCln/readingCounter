import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IObjectIteratation, ISearchInOrderTo } from 'interfaces/ioverall-config';
import { IFollowUp, IFollowUpHistory } from 'interfaces/isearchs';
import { IOffLoadPerDay } from 'interfaces/itrackings';
import { CloseTabService } from 'services/close-tab.service';
import { FollowUpService } from 'services/follow-up.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent extends FactoryONE {
  shouldActive: boolean = false;
  _showDesc: IObjectIteratation[] = [];
  _defColumns: any[];
  showInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'گراف',
      isSelected: true,
      key:'Graph'
    },
    {
      title: 'جدول',
      isSelected: false,
      key:'Table'
    }
  ]
  clonedProducts: { [s: string]: IFollowUpHistory; } = {};
  dataSource: IFollowUp;
  dataSourceAUX: IOffLoadPerDay;
  changeHsty: IFollowUpHistory[] = [];
  _selectColumnsAUX: IObjectIteratation[];


  constructor(
    public trackingManagerService: TrackingManagerService,
    public closeTabService: CloseTabService,
    private authService: AuthService,
    private followUpService: FollowUpService
  ) {
    super();
    this.classWrapper();
  }

  toPreStatus = async (dataSource: IFollowUpHistory) => {
    const a = await this.trackingManagerService.firstConfirmDialog(EN_messages.reason_backToPrev, true, false);
    if (a) {
      this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingPRE, dataSource.id, a);
    }
  }
  private makeConfigs = async () => {
    this.changeHsty = this.dataSource.changeHistory;
    this.getUserRole();
    this.insertToDesc();
  }
  connectToServer = async () => {
    if (this.trackingManagerService.verificationTrackNumber(this.closeTabService.saveDataForFollowUpReq.trackNumber)) {
      this.dataSource = await this.trackingManagerService.getDataSourceByQuote(ENInterfaces.trackingFOLLOWUP, this.closeTabService.saveDataForFollowUpReq.trackNumber);
      if (this.trackingManagerService.isValidationNull(this.dataSource))
        return;
      this.closeTabService.saveDataForFollowUp = this.dataSource;
      this.dataSourceAUX = await this.trackingManagerService.getLMPD(this.closeTabService.saveDataForFollowUpReq.trackNumber.toString());
      this.closeTabService.saveDataForFollowUpAUX = this.dataSourceAUX;
      this.makeConfigs();

    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForFollowUp = '';
      this.connectToServer();
    }
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
    if (this.closeTabService.saveDataForFollowUp) {
      this.dataSource = this.closeTabService.saveDataForFollowUp;
      this.dataSourceAUX = this.closeTabService.saveDataForFollowUpAUX;
      this.makeConfigs();
      return;
    }
  }
  onRowEditSave = async (dataSource: IFollowUpHistory) => {
    await this.trackingManagerService.postEditState(ENInterfaces.trackingEditState, { id: dataSource.id, seen: dataSource.seen });
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  getUserRole = (): void => {
    const jwtRole = this.authService.getAuthUser();
    this.shouldActive = jwtRole.roles.toString().includes('admin') ? true : false;
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
      this._selectColumnsAUX = this.trackingManagerService.getLMPerDayFollowUpPositions();
    }
    this._showDesc = this.trackingManagerService.getFollowUpView();
    this._defColumns = this.trackingManagerService.getColumnDefColumns();
    this.clearUNUsables();
  }
  showInMap = () => {
    this.trackingManagerService.routeToLMPDXY(this.dataSource.trackNumber, this.dataSource.changeHistory[this.changeHsty.length - 1].insertDateJalali, this.dataSourceAUX.overalDistance, true);
  }
  routeToLMAll = (row: IFollowUpHistory) => {
    row.listNumber = this.dataSourceAUX.listNumber;
    row.trackNumber = this.dataSourceAUX.trackNumber;
    this.trackingManagerService.routeToLMAll(row);
  }
  ngOnInit(): void { return; }

}
