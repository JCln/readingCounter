import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserRoleCompare } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-user-role-compare',
  templateUrl: './user-role-compare.component.html',
  styleUrls: ['./user-role-compare.component.scss']
})
export class UserRoleCompareComponent extends FactoryONE {

  constructor(
    private securityService: SecurityService,
    public closeTabService: CloseTabService

  ) {
    super();
  }

  assignToPrevious = () => {
    this.closeTabService.userRoleCompare.previous = {
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
                  isSelected: true
                }
              ],
              isSelected: true
            }
          ],
          isSelected: true
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
                      isSelected: true
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
      this.securityService.utilsService.routeTo(EN_Routes.userRoleHistoryDetails);
    }
    else {
      const res: IUserRoleCompare = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.UserRoleCompare, this.securityService.userMasterDetailsHistory_pageSign.id + `/${this.securityService.userMasterDetailsHistory_pageSign.changeOrInsertUserLogId}`);
      this.closeTabService.saveDataForUserMasterDetailsHistoryReq.id = this.securityService.userMasterDetailsHistory_pageSign.id;

      if (MathS.isNull(res.previous)) {
        this.assignToPrevious();
      }
      else {
        this.closeTabService.userRoleCompare.previous = res.previous;
      }
      this.closeTabService.userRoleCompare.this = res.this;
    }
    console.log(this.closeTabService.userRoleCompare);

  }

}