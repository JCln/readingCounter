import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserCompareManager } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-user-compare',
  templateUrl: './user-compare.component.html',
  styleUrls: ['./user-compare.component.scss']
})
export class UserCompareComponent extends FactoryONE {

  constructor(
    private securityService: SecurityService,
    public closeTabService: CloseTabService

  ) {
    super();
  }

  assignToPrevious = () => {
    this.closeTabService.userCompare.previous = {
      provinceItems: [
        {
          title: '',
          logicalOrder: null,
          regionItems: [
            {
              title: '',
              logicalOrder: null,
              zoneItems: [
                {
                  title: '',
                  logicalOrder: null,
                  id: null,
                  isMetro: true,
                  isSelected: false
                }
              ],
              isSelected: false
            }
          ],
          isSelected: false
        }
      ],
      appItems: [
        {
          title: '',
          cssClass: '',
          logicalOrder: null,
          moduleItems: [
            {
              title: '',
              cssClass: '',
              logicalOrder: null,
              controllerItems: [
                {
                  title: '',
                  cssClass: '',
                  logicalOrder: null,
                  actionItems: [
                    {
                      title: '',
                      cssClass: '',
                      logicalOrder: null,
                      value: '',
                      isSelected: false
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      changeOrInsertLogId: '',
      description: '',
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
      userDisplayName: ''
    }
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (!this.securityService.userMasterDetailsHistory_pageSign.id) {
      console.log(1);
      this.securityService.utilsService.routeTo(EN_Routes.userMasterHistory);
    }
    else {
      const res: IUserCompareManager = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.UserCompare, this.securityService.userMasterDetailsHistory_pageSign.id + `/${this.securityService.userMasterDetailsHistory_pageSign.changeOrInsertUserLogId}`);
      console.log(res);
      this.closeTabService.saveDataForUserMasterDetailsHistoryReq.id = this.securityService.userMasterDetailsHistory_pageSign.id;

      if (MathS.isNull(res.previous.ip) && MathS.isNull(res.previous.appItems)) {
        console.log(1);
        this.assignToPrevious();
      }
      else {
        console.log(1);
        this.closeTabService.userCompare.previous = res.previous;
      }
      this.closeTabService.userCompare.this = res.this;
    }
    console.log(this.closeTabService.userCompare);

  }

}