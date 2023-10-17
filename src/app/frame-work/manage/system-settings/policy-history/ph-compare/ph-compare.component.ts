import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPolicies, IPoliciesCompare } from 'services/DI/privacies';
import { SecurityService } from 'services/security.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-ph-compare',
  templateUrl: './ph-compare.component.html',
  styleUrls: ['./ph-compare.component.scss']
})
export class PhCompareComponent implements OnInit {
  dataSource: IPolicies[] = [];
  _selectCols: any = [];
  policyCompareColumns: string = 'policyCompare';

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
      browserTitle: '',
      browserVersion: '',
      enableValidIpCaptcha: null,//boolean
      requireCaptchaInvalidAttempts: null,
      enableValidIpRecaptcha: null,//boolean
      requireRecaptchaInvalidAttempts: null,
      browserShortTitle: '',
      browserEngine: '',
      browserType: '',
      osTitle: '',
      osVersion: '',
      osPlatform: '',
      osShortTitle: '',
      lockInvalidAttempts: null,
      lockMin: null,
      minPasswordLength: null,
      passwordContainsNumber: null,//boolean
      passwordContainsLowercase: null,//boolean
      passwordContainsUppercase: null,//boolean
      passwordContainsNonAlphaNumeric: null,//boolean
      canUpdateDeviceId: null,//boolean
      userAgent: '',
      fromTime: '',
      toTime: '',
      deactiveTerminationMinutes: null,
      maxLogRecords: null,
    }
  }
  insertSelectedColumns = () => {
    this._selectCols = this.columnManager.getColumnsMenus(this.policyCompareColumns);
  }
  classWrapper = async () => {
    const res: IPoliciesCompare = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.policiesCompare, this.config.data.id);
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
