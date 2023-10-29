import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserCompareDetails, IUserRoleCompare } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-user-role-compare',
  templateUrl: './user-role-compare.component.html',
  styleUrls: ['./user-role-compare.component.scss']
})
export class UserRoleCompareComponent extends FactoryONE {
  dataSource: any = [];
  _selectCols: any[] = [];
  ipFilterColumns: string = 'userRoleCompare_UserInfo';

  constructor(
    private securityService: SecurityService,
    public closeTabService: CloseTabService,
    public columnManager: ColumnManager,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    super();
  }

  assignToPrevious = () => {
    this.dataSource.previous = {
      id: null,
      title: null,
      titleUnicode: null,
      needDeviceIdLogin: null,
      displaySensitiveNotification: null
    }
  }

  insertSelectedColumns = () => {
    this._selectCols = this.columnManager.getColumnsMenus(this.ipFilterColumns);
    console.log(this.ipFilterColumns);

  }
  classWrapper = async (canRefresh?: boolean) => {
    console.log(this.securityService.userRoleHistoryDetails_pageSign.id);

    if (!this.securityService.userRoleHistoryDetails_pageSign.id) {
      this.securityService.utilsService.routeTo(EN_Routes.userRoleHistoryDetails);
    }
    else {
      const res: IUserRoleCompare = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.UserRoleCompare, this.securityService.userRoleHistoryDetails_pageSign.id + `/${this.securityService.userRoleHistoryDetails_pageSign.changeOrInsertUserLogId}`);
      console.log(res);

      if (MathS.isNull(res.previous)) {
        this.assignToPrevious();
      }
      else {
        this.dataSource.previous = res.previous;
      }
      this.dataSource.this = res.this;
    }
    console.log(this.dataSource);

    this.insertSelectedColumns();
  }
  close() {
    this.ref.close();
  }

}