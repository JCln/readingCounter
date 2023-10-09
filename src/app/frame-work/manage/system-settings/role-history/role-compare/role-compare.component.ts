import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IRoleDto, IRoleReqLogCompare } from 'services/DI/privacies';
import { SecurityService } from 'services/security.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-role-compare',
  templateUrl: './role-compare.component.html',
  styleUrls: ['./role-compare.component.scss']
})
export class RoleCompareComponent implements OnInit {
  dataSource: IRoleDto[] = [];
  _selectCols: any = [];
  roleCompareColumns: string = 'roleCompare';

  constructor(
    private securityService: SecurityService,
    public columnManager: ColumnManager,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  assignToPrevious = () => {
    this.dataSource[0] = {
      id: null,
      title: '',
      titleUnicode: '',
      needDeviceIdLogin: false,
      displaySensitiveNotification: false
    }
  }
  insertSelectedColumns = () => {
    this._selectCols = this.columnManager.columnSelectedMenus(this.roleCompareColumns);
  }
  classWrapper = async () => {
    const res: IRoleReqLogCompare = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.RoleReqLogCompare, this.config.data.id);
    if (MathS.isNull(res.previous)) {
      this.assignToPrevious();
    }
    else {
      this.dataSource[0] = res.previous;
    }
    this.dataSource[1] = res.this;

    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  close() {
    this.ref.close();
  }
}
