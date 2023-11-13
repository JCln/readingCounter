import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IIOPolicyHistory, IIOPolicyHistoryCompare } from 'interfaces/iserver-manager';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SecurityService } from 'services/security.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-io-policy-history-compare',
  templateUrl: './io-policy-history-compare.component.html',
  styleUrls: ['./io-policy-history-compare.component.scss']
})
export class IOPolicyHistoryCompareComponent implements OnInit {
  dataSource: IIOPolicyHistory[] = [];
  _selectCols: any = [];
  readonly IOPolicyCompareColumns: string = 'IOPolicyHistoryCompare';

  constructor(
    private securityService: SecurityService,
    public columnManager: ColumnManager,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  assignToPrevious = () => {
    this.dataSource[0] = {
      id: null,
      inputExtensions: '',
      contentType: '',
      inputMaxSizeKb: null,
      inputMaxCountPerUser: null,
      inputMaxCountPerDay: null,
      outputMaxCountPerUser: null,
      outputMaxCountPerDay: null,
      userDisplayName: '',
      username: '',
      isActive: false,
      insertDateTime: '',
      insertDateJalali: '',
      insertTime: '',
      ip: '',
      browserVersion: '',
      browserTitle: '',
      browserShortTitle: '',
      browserEngine: '',
      browserType: '',
      osVersion: '',
      osTitle: '',
      osPlatform: '',
      osShortTitle: '',
      userAgent: '',
      isAuthentic: false
    }
  }
  insertSelectedColumns = () => {
    this._selectCols = this.columnManager.getColumnsMenus(this.IOPolicyCompareColumns);
  }
  classWrapper = async () => {
    const res: IIOPolicyHistoryCompare = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.GetIOPolicyCompare, this.config.data.id);
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
