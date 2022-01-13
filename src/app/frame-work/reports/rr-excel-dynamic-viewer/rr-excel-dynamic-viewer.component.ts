import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITracking } from 'interfaces/itrackings';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-rr-excel-dynamic-viewer',
  templateUrl: './rr-excel-dynamic-viewer.component.html',
  styleUrls: ['./rr-excel-dynamic-viewer.component.scss']
})
export class RrExcelDynamicViewerComponent extends FactoryONE {

  dataSource: ITracking[] = [];
  _selectCols: any = [];
  _selectedColumns: any[];

  constructor(
    private closeTabService: CloseTabService,
    public readingReportManagerService: ReadingReportManagerService,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForToolsExcelViewer = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForToolsExcelViewer) {
      this.dataSource = this.closeTabService.saveDataForToolsExcelViewer;
    }
    else {
      this.dataSource = await this.readingReportManagerService.dataSourceGET(ENInterfaces.getToolsDynamicExcel);
      this.closeTabService.saveDataForToolsExcelViewer = this.dataSource;
    }
  }
}