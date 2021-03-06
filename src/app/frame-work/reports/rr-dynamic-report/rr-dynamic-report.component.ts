import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDynamicReportsRes } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-rr-dynamic-report',
  templateUrl: './rr-dynamic-report.component.html',
  styleUrls: ['./rr-dynamic-report.component.scss']
})
export class RrDynamicReportComponent extends FactoryONE {

  dataSource: IDynamicReportsRes[] = [];

  constructor(
    private closeTabService: CloseTabService,
    public readingReportManagerService: ReadingReportManagerService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForDynamicReports = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForDynamicReports) {
      this.dataSource = this.closeTabService.saveDataForDynamicReports;
    }
    else {
      this.dataSource = await this.readingReportManagerService.dataSourceGET(ENInterfaces.dynamicReportManagerAll);
      this.closeTabService.saveDataForDynamicReports = this.dataSource;
    }
  }
  removeRow = async (dataSource: any) => {
    if (await this.readingReportManagerService.firstConfirmDialogRemove()) {
      const a = await this.readingReportManagerService.postDataSource(ENInterfaces.dynamicReportManagerRemove, dataSource['id']);
      this.readingReportManagerService.successSnackMessage(a.message);
      this.refreshTable();
    }
  }

}