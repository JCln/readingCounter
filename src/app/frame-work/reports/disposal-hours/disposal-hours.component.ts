import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IRRChartResWrapper } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';


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
    this.readingReportManagerService.routeTo(EN_Routes.wrrptsmamdhchart);
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
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }
}
