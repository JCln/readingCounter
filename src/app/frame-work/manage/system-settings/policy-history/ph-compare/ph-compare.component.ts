import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPolicies, IPoliciesCompare } from 'services/DI/privacies';
import { SecurityService } from 'services/security.service';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-ph-compare',
  templateUrl: './ph-compare.component.html',
  styleUrls: ['./ph-compare.component.scss']
})
export class PhCompareComponent implements OnInit {
  dataSource = [{
    userDisplayName: '',
    ip: null,
    browserTitle: '',
    browserVersion: '',
    enableValidIpCaptcha: '',
    requireCaptchaInvalidAttempts: '',
    enableValidIpRecaptcha: false,
    requireRecaptchaInvalidAttempts: false,
    browserShortTitle: '',
    browserEngine: '',
    browserType: '',
    osTitle: '',
    osVersion: '',
    osPlatform: '',
  },
  {
    userDisplayName: '',
    ip: null,
    browserTitle: '',
    browserVersion: '',
    enableValidIpCaptcha: '',
    requireCaptchaInvalidAttempts: '',
    enableValidIpRecaptcha: false,
    requireRecaptchaInvalidAttempts: false,
    browserShortTitle: '',
    browserEngine: '',
    browserType: '',
    osTitle: '',
    osVersion: '',
    osPlatform: '',
  }
  ];
  constructor(
    private securityService: SecurityService,
    private columnManager: ColumnManager,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  compareThisToPrevious = () => {
    // for (let index = 0; index < this.dataSource.previous.; index++) {
    //   const element = this.dataSource;

    // }
    console.log(1);
    console.log(this.columnManager.columnSelectedMenus('policyCompare')[6].field + this.columnManager.columnSelectedMenus('policyCompare')[6].icon);    
    
    if (this.dataSource[0].enableValidIpRecaptcha !== this.dataSource[1].enableValidIpRecaptcha) {
      this.columnManager.columnSelectedMenus('policyCompare')[6].icon = '_editable';
    }
    else {
      console.log('nothing !');

    }
    console.log(this.columnManager.columnSelectedMenus('policyCompare'));
  }
  classWrapper = async () => {
    const res: IPoliciesCompare = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.policiesCompare, this.config.data.id);
    console.log(res);
    this.dataSource[0].userDisplayName = res.previous.userDisplayName;
    this.dataSource[0].ip = res.previous.ip;
    this.dataSource[0].browserTitle = res.previous.browserTitle;
    this.dataSource[0].browserVersion = res.previous.browserVersion;
    this.dataSource[0].enableValidIpRecaptcha = res.previous.enableValidIpRecaptcha;
    this.dataSource[0].browserShortTitle = res.previous.browserShortTitle;
    this.dataSource[0].browserEngine = res.previous.browserEngine;
    this.dataSource[0].browserType = res.previous.browserType;
    this.dataSource[0].osTitle = res.previous.osTitle;
    this.dataSource[0].osVersion = res.previous.osVersion;
    this.dataSource[0].osPlatform = res.previous.osPlatform;

    this.dataSource[1].userDisplayName = res['this'].userDisplayName;
    this.dataSource[1].ip = res['this'].ip;
    this.dataSource[1].browserTitle = res['this'].browserTitle;
    this.dataSource[1].browserVersion = res['this'].browserVersion;
    this.dataSource[1].enableValidIpRecaptcha = res['this'].enableValidIpRecaptcha;
    this.dataSource[1].browserShortTitle = res['this'].browserShortTitle;
    this.dataSource[1].browserEngine = res['this'].browserEngine;
    this.dataSource[1].browserType = res['this'].browserType;
    this.dataSource[1].osTitle = res['this'].osTitle;
    this.dataSource[1].osVersion = res['this'].osVersion;
    this.dataSource[1].osPlatform = res['this'].osPlatform;

    console.log(this.dataSource);
    this.compareThisToPrevious();


  }
  ngOnInit(): void {
    this.classWrapper();
  }
  close() {
    this.ref.close();
  }
}
