import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IDynamicExcelReq } from 'src/app/Interfaces/itools';

@Component({
  selector: 'app-rr-excel-dynamic-viewer',
  templateUrl: './rr-excel-dynamic-viewer.component.html',
  styleUrls: ['./rr-excel-dynamic-viewer.component.scss']
})
export class RrExcelDynamicViewerComponent extends FactoryONE {

  dataSource: IDynamicExcelReq[] = [];
  _selectCols: any = [];
  _selectedColumns: any[];

  constructor(
    private closeTabService: CloseTabService,
    public readingReportManagerService: ReadingReportManagerService,
    private outputManagerService: OutputManagerService,
    private authService: AuthService
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
  downloadExcel = async (body) => {
    const options = {
      disableClose: false,
      title: EN_messages.download_excel,
      buttonText: EN_messages.download_excelButton,
      buttonColor: 'rgb(246, 128, 56)'
    }

    const temp = await this.readingReportManagerService.showResDialogDynamic(body.jsonInfo, options);
    if (temp !== {}) {
      const res = await this.readingReportManagerService.postExcel(body.url, temp);
      this.outputManagerService.downloadFile(res, '.xlsx');
    }
  }
  getUserRole = (): boolean => {
    const jwtRole = this.authService.getAuthUser();
    return jwtRole.roles.toString().includes('admin') ? true : false;
  }
  removeRow = async (id: number) => {
    if (this.getUserRole()) {

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