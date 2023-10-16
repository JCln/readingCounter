import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IGetBlockedCompareVals, IIpFilterCompare } from 'interfaces/iserver-manager';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SecurityService } from 'services/security.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  dataSource: IGetBlockedCompareVals[] = [];
  _selectCols: any = [];
  ipFilterColumns: string = 'ipFilterCompare';

  constructor(
    private securityService: SecurityService,
    public columnManager: ColumnManager,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  assignToPrevious = () => {
    this.dataSource[0] = {
      id: null,
      userDisplayName: '',
      ip: null,
      subnet: '',
      isSafe: false,
      isV6: false,
      username: '',
      browserTitle: '',
      browserVersion: '',
      browserShortTitle: '',
      browserEngine: '',
      browserType: '',
      osTitle: '',
      osVersion: '',
      osPlatform: '',
      osShortTitle: '',
      userAgent: '',
      description: '',
      insertDateJalali: '',
      insertTime: '',
      userIp: '',
      isRecordAuthentic: false
    }
  }
  insertSelectedColumns = () => {
    this._selectCols = this.columnManager.columnSelectedMenus(this.ipFilterColumns);
    console.log(this._selectCols);
    console.log(this.dataSource);
    
  }
  classWrapper = async () => {
    const res: IIpFilterCompare = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.GetIpFilterCompare, this.config.data.id);
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
