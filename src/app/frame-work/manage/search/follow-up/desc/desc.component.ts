import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IFollowUp, IFollowUpHistory, IOffLoadPerDay } from 'interfaces/imanage';
import { IObjectIteratation, ISearchInOrderTo } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FactoryONE } from 'src/app/classes/factory';

import { FollowUpService } from './../follow-up.service';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent extends FactoryONE {
  trackNumber: string;
  shouldActive: boolean = false;

  _showDesc: IObjectIteratation[] = [];
  _defColumns: IObjectIteratation[] = [];
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
    public trackingManagerService: TrackingManagerService,
    private closeTabService: CloseTabService,
    public route: ActivatedRoute,
    public interactionService: InteractionService,
    private followUpService: FollowUpService,
    private authService: AuthService
  ) {
    super(interactionService);
    this.getRouteParams();
  }

  toPreStatus = (dataSource: IFollowUpHistory) => {
    this.trackingManagerService.backToConfirmDialog(dataSource.id);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.followUpService.setData(null);
    }
    this.dataSource = this.followUpService.getData();
    if (!this.dataSource) {
      this.dataSource = await this.trackingManagerService.getDataSourceByQuote(ENInterfaces.trackingFOLLOWUP, this.trackNumber);
    }

    this.changeHsty = this.dataSource.changeHistory;
    this.getUserRole();
    this.insertToDesc();
    this.dataSourceAUX = await this.trackingManagerService.getLMPD(this.trackNumber);
    this.trackingManagerService.setGetRanges(this.dataSourceAUX);
    if (this.dataSourceAUX)
      this._selectColumnsAUX = this.trackingManagerService.columnSelectedLMPerDayPositions();
  }
  getRouteParams = () => {
    this.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
    this.classWrapper();
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  insertToDesc = () => {
    this._showDesc = this.trackingManagerService.columnDescView();
    this.clearUNUsables();
  }
  showInMap = () => {
    this.trackingManagerService.routeToLMPDXY(this.dataSource.trackNumber, this.dataSource.changeHistory[0].insertDateJalali, null);
  }
  routeToLMAll = (row: IFollowUpHistory) => {
    this.trackingManagerService.routeToLMAll(row);
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
  ngOnInit(): void { return; }
}