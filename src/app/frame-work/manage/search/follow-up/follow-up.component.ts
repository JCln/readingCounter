import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IFollowUp, IFollowUpHistory, IOffLoadPerDay } from 'interfaces/imanage';
import { IObjectIteratation, ISearchInOrderTo } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
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
    private authService: AuthService
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
    this.trackingManagerService.setGetRanges(this.dataSourceAUX);
    this.closeTabService.saveDataForFollowUpAUX = this.dataSourceAUX;
    if (this.dataSourceAUX)
      this._selectColumnsAUX = this.trackingManagerService.columnSelectedLMPerDayPositions();
  }
  connectToServer = async () => {
    if (this.trackingManagerService.verificationFollowUPTrackNumber(this.trackNumber)) {
      this.dataSource = await this.trackingManagerService.getDataSourceByQuote(ENInterfaces.trackingFOLLOWUP, this.trackNumber);
      this.closeTabService.saveDataForFollowUp = this.dataSource;
      if (this.trackingManagerService.isValidationNull(this.dataSource))
        return;
      this.dataSourceAUX = await this.trackingManagerService.getLMPD(this.trackNumber.toString());
      this.dataSourceAUX = this.closeTabService.saveDataForFollowUpAUX;
    }
    this.makeConfigs();
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForFollowUp = '';
    }
    console.log(this.closeTabService.saveDataForFollowUpAUX);

    if (this.closeTabService.saveDataForFollowUp) {
      this.dataSource = this.closeTabService.saveDataForFollowUp;
      this.dataSourceAUX = this.closeTabService.saveDataForFollowUpAUX;
      this.makeConfigs();
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
    this._showDesc = this.trackingManagerService.columnDescView();
    this._defColumns = this.trackingManagerService.columnDefColumns();
    this.clearUNUsables();
  }
  showInMap = () => {
    this.trackingManagerService.routeToLMPDXY(this.dataSource.trackNumber, this.dataSource.changeHistory[0].insertDateJalali, null);
  }
  routeToLMAll = (row: IFollowUpHistory) => {
    this.trackingManagerService.routeToLMAll(row);
  }
  refreshTable = () => {
    this.connectToServer();
  }
  ngOnInit(): void { return; }

}
