import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IRRChartResWrapper } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';


@Component({
  selector: 'app-disposal-hours',
  templateUrl: './disposal-hours.component.html',
  styleUrls: ['./disposal-hours.component.scss']
})
export class DisposalHoursComponent extends FactoryONE {
  isCollapsed: boolean = false;
  _isOrderByDate: boolean = true;
  _selectedKindId: string = '';
  zoneDictionary: IDictionaryManager[] = [];

  dataSource: IRRChartResWrapper[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,

    private closeTabService: CloseTabService,
    public route: ActivatedRoute
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRDisposalHours = null;
      this.verification();
    }
    if (this.closeTabService.saveDataForRRDisposalHours) {
      this.dataSource = this.closeTabService.saveDataForRRDisposalHours;
    }

    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
  }
  routeToChartView = () => {
    this.readingReportManagerService.routeTo('/wr/rpts/mam/dh/chart');
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationRRDisposalHours(this.readingReportManagerService.disposalhoursReq);
  }
  verification = async () => {
    if (this.validation())
      document.activeElement.id == 'grid_view' ? this.connectToServer() : this.routeToChartView();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ListDispersalHours, this.readingReportManagerService.disposalhoursReq);
    this.closeTabService.saveDataForRRDisposalHours = this.dataSource;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }
}
