import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IProvinceHierarchy } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';
import { EN_Routes } from 'interfaces/routes.enum';
import { TreeSelect } from 'primeng/treeselect';


@Component({
  selector: 'app-disposal-hours',
  templateUrl: './disposal-hours.component.html',
  styleUrls: ['./disposal-hours.component.scss'],
  animations: [transitionAnimation]
})
export class DisposalHoursComponent extends FactoryONE {
  provinceHierarchy: IProvinceHierarchy[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService,
    public route: ActivatedRoute
  ) {
    super();
  }

  classWrapper = async () => {
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
  }
  routeToChartView = () => {
    this.readingReportManagerService.routeTo(EN_Routes.wrrptsmamdhchart);
  }
  validation = (): boolean => {
    return this.readingReportManagerService.verificationService.verificationRRDisposalHours(this.closeTabService.disposalhoursReq);
  }
  verification = async () => {
    this.closeTabService.disposalhoursReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    if (this.validation())
      document.activeElement.id == 'grid_view' ? this.connectToServer() : this.routeToChartView();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRRDisposalHours = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ListDispersalHours, this.closeTabService.disposalhoursReq);
  }
  refreshTable = () => {
    if (this.validation())
      this.connectToServer();
  }
}
