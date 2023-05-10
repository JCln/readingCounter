import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-rr-excel-dynamic-viewer',
  templateUrl: './rr-excel-dynamic-viewer.component.html',
  styleUrls: ['./rr-excel-dynamic-viewer.component.scss']
})
export class RrExcelDynamicViewerComponent extends FactoryONE {

  _selectCols: any = [];
  _selectedColumns: any[];

  constructor(
    public closeTabService: CloseTabService,
    public readingReportManagerService: ReadingReportManagerService,
    private outputManagerService: OutputManagerService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForToolsExcelViewer = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForToolsExcelViewer) {
      this.closeTabService.saveDataForToolsExcelViewer = await this.readingReportManagerService.dataSourceGET(ENInterfaces.getToolsDynamicExcel);
    }
  }
  downloadExcel = async (body) => {
    const options = {
      disableClose: false,
      title: EN_messages.download_excel,
      buttonText: EN_messages.download_excelButton,
      buttonColor: 'rgb(246, 128, 56)'
    }

    const temp: object = await this.readingReportManagerService.showResDialogDynamic(body.jsonInfo, options);
    if (temp) {
      const res = await this.readingReportManagerService.postExcel(body.url, temp);
      this.outputManagerService.downloadFile(res, '.xlsx');
    }
  }
  removeRow = async (id: number) => {
    if (this.readingReportManagerService.utilsService.getIsAdminRole()) {

      if (await this.readingReportManagerService.firstConfirmDialogRemove()) {
        const a = await this.readingReportManagerService.postById(ENInterfaces.removeToolsDynamicExcel, id['dataSource'].id);
        if (a) {
          this.readingReportManagerService.successSnackMessage(a.message);
          this.refreshTable();
        }
      }

    } else {
      this.readingReportManagerService.snackWarn(EN_messages.access_denied);
    }
  }

}