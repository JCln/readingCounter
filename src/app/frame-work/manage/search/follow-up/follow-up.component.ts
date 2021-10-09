import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IFollowUp, IFollowUpHistory, IOffLoadPerDay } from 'interfaces/imanage';
import { IObjectIteratation, ISearchInOrderTo } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { FollowUpService } from 'services/follow-up.service';
import { InteractionService } from 'services/interaction.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent extends FactoryONE {
  _isCollapsed: boolean = false;
  trackNumber: number;
  shouldActive: boolean = false;
  _showDesc: IObjectIteratation[] = [];
  _defColumns: any[];
  canShowGraph: boolean = false;
  showInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'گراف',
      isSelected: true
    },
    {
      title: 'جدول',
      isSelected: false
    }
  ]
  clonedProducts: { [s: string]: IFollowUpHistory; } = {};
  dataSource: IFollowUp;
  dataSourceAUX: IOffLoadPerDay;
  changeHsty: IFollowUpHistory[] = [];
  _selectColumnsAUX: IObjectIteratation[];


  constructor(
    private trackingManagerService: TrackingManagerService,
    private closeTabService: CloseTabService,
    public interactionService: InteractionService,
    private authService: AuthService,
    private followUpService: FollowUpService
  ) {
    super(interactionService);
    this.classWrapper();
  }

  toPreStatus = (dataSource: IFollowUpHistory) => {
    this.trackingManagerService.backToConfirmDialog(dataSource.id);
  }
  private makeConfigs = async () => {
    this.changeHsty = this.dataSource.changeHistory;
    this.getUserRole();
    this.insertToDesc();
  }
  connectToServer = async () => {
    if (!this.trackingManagerService.verificationFollowUPTrackNumber(this.trackNumber))
      return;

    this.dataSource = await this.trackingManagerService.getDataSourceByQuote(ENInterfaces.trackingFOLLOWUP, this.trackNumber);
    if (this.trackingManagerService.isValidationNull(this.dataSource))
      return;
    this.closeTabService.saveDataForFollowUp = this.dataSource;
    this.dataSourceAUX = await this.trackingManagerService.getLMPD(this.trackNumber.toString());
    this.closeTabService.saveDataForFollowUpAUX = this.dataSourceAUX;
    this.makeConfigs();

  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForFollowUp = '';
    }
    /** 
     * it separate data from followUp service and 
     * simple search route,
     * it should first call check hasTrackNumber function
     * then data were saved     
     */
    if (this.followUpService.hasTrackNumber()) {
      this.trackNumber = this.followUpService.getTrackNumber();
      console.log(13);

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
      this._selectColumnsAUX = this.trackingManagerService.columnSelectedLMPerDayPositions();
    }
    this._showDesc = this.trackingManagerService.columnFollowUpView();
    this._defColumns = this.trackingManagerService.columnDefColumns();
    this.clearUNUsables();
  }
  showInMap = () => {
    this.trackingManagerService.routeToLMPDXY(this.dataSource.trackNumber, this.dataSource.changeHistory[this.changeHsty.length - 1].insertDateJalali, this.dataSourceAUX.overalDistance);
  }
  routeToLMAll = (row: IFollowUpHistory) => {
    this.trackingManagerService.routeToLMAll(row);
  }
  ngOnInit(): void { return; }

}
