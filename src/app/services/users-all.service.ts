import { VerificationService } from './verification.service';
import { PageSignsService } from './page-signs.service';
import { AjaxReqWrapperService } from 'services/ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENLocalStorageNames, ENSelectedColumnVariables, ENSnackBarColors, EN_messages } from 'interfaces/enums.enum';
import { INotifyDirectImage } from 'interfaces/inon-manage';
import { IAUserEditSave, IUserEditManager, IUserEditOnRole, IUserEditOnRoleManager } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';
import { Observable } from 'rxjs/internal/Observable';

import { MathS } from '../classes/math-s';
import { UtilsService } from './utils.service';
import { IResponses } from 'interfaces/ioverall-config';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { MapService } from './map.service';
import { Converter } from '../classes/converter';

interface IIDTitle {
  id: number,
  title: string
}
@Injectable({
  providedIn: 'root'
})
export class UsersAllService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  userEditOnRoleRoleVal: IIDTitle;
  latestZoneViewType: boolean = false;

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public verificationService: VerificationService,
    private utilsService: UtilsService,
    public dictionaryWrapperService: DictionaryWrapperService,
    private mapService: MapService,
    public pageSignsService: PageSignsService
  ) { }


  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  snackBarMessageSuccess = (res: IResponses) => {
    this.utilsService.snackBarMessageSuccess(res.message);
  }
  routeToUsersAll = () => {
    this.utilsService.routeTo(EN_Routes.wrmuall);
  }
  routeToEditPage(e) {
    if (e.isRemoved) {
      const message: string = 'کاربر ' + e.displayName + '(' + e.userCode + ')' + EN_messages.userIsRemoved;
      this.utilsService.snackBarMessageWarn(message);
      return;
    }

    this.pageSignsService.userEdit_pageSign.GUid = e.id;
    this.utilsService.routeTo(EN_Routes.wrmuedit);
  }
  getLatestZoneViewType = () => {
    if (this.mapService.browserStorageService.isExists(ENLocalStorageNames.latestZoneViewType)) {
      this.latestZoneViewType = this.mapService.browserStorageService.getLocal(ENLocalStorageNames.latestZoneViewType);
    }
    else {
      this.mapService.saveToLocalStorage(ENLocalStorageNames.latestZoneViewType, false);
    }
  }
  routeToAddAUser = () => this.utilsService.routeTo(EN_Routes.wrmuadd);
  deleteSingleRow = async (place: ENInterfaces, id: number) => {
    const res = await this.ajaxReqWrapperService.postDataSourceById(place, id);
    this.snackBarMessageSuccess(res);
    return true;
  }
  firstConfirmDialog = (dialogConfig: any): Promise<any> => {
    const a = {
      messageTitle: dialogConfig.messageTitle,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      text: dialogConfig.text,
      icon: dialogConfig.icon ? dialogConfig.icon : 'fas fa-user-lock',
      doesNotReturnButton: dialogConfig.doesNotReturnButton
    }
    return this.utilsService.firstConfirmDialog(a);
  }

  /* VALIDATION & VERIFICATION */
  verification = (dataSource: any): boolean => {
    if (!this.verificationService.sectionVertification(dataSource))
      return false;
    return true;
  }
  private getAUserProvince = (zoneItems: any): number[] => {
    let selectedZones: any[] = [];
    zoneItems.map(proIt => {
      proIt.regionItems.map(regionIt => {
        regionIt.zoneItems.map(zoneIt => {
          if (zoneIt.isSelected)
            selectedZones.push(zoneIt.id)
        })
      })
    })
    return selectedZones;
  }
  private getAUserRoleItems = (val: any): number[] => {
    const a: number[] = [];
    val.filter(ids => {
      if (ids.isSelected)
        a.push(ids.id);
    });
    if (MathS.isNull(a))
      return [0];
    return a;
  }
  private addAUserActions = (items: any): string[] => {
    let selectedActions: string[] = [];
    items.map(appIt => {
      appIt.moduleItems.map(moduleIt => {
        moduleIt.controllerItems.map(ctrlIt => {
          ctrlIt.actionItems.map(actionIt => {
            if (actionIt.isSelected) {
              selectedActions.push(actionIt.value);
            }
          })
        })
      })
    })
    return selectedActions;
  }

  private connectToServerEdit = async (vals: IAUserEditSave) => {
    if (this.verificationService.userEditSave(vals)) {
      const text = EN_messages.confirm_userChange + ' ' + vals.displayName + ' ' + EN_messages.confirm_userChange_2;
      if (await this.firstConfirmDialog({ messageTitle: text })) {
        const res = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.userEDIT, vals);
        if (res) {
          this.utilsService.snackBarMessage(res.message, ENSnackBarColors.success);
          this.utilsService.routeToByUrl(EN_Routes.wrmuall);
        }
      }
    }

  }
  userEditA = (UUid: string, dataSource: IUserEditManager) => {
    const vals: IAUserEditSave = {
      selectedRoles: this.getAUserRoleItems(dataSource.roleItems),
      selectedZones: this.getAUserProvince(dataSource.provinceItems),
      selectedActions: this.addAUserActions(dataSource.appItems),
      id: UUid,
      firstName: dataSource.userInfo.firstName,
      sureName: dataSource.userInfo.sureName,
      email: dataSource.userInfo.email,
      mobile: Converter.persianToEngNumbers(dataSource.userInfo.mobile),
      displayMobile: MathS.isNull(dataSource.userInfo.displayMobile) ? false : dataSource.userInfo.displayMobile,
      displayName: dataSource.userInfo.displayName,
      deviceId: dataSource.userInfo.deviceId,
      isActive: dataSource.userInfo.isActive
    }
    this.connectToServerEdit(vals);
  }
  userEditOnRole = async (dataSource: IUserEditOnRoleManager) => {
    if (this.verificationService.verificationEditOnRoleGroupAccess(this.userEditOnRoleRoleVal)) {

      const val: IUserEditOnRole = {
        roleId: this.userEditOnRoleRoleVal.id,
        selectedActions: this.addAUserActions(dataSource.appItems)
      }

      if (this.verificationService.verificationEditOnRole(val)) {
        const text = EN_messages.confirm_userGroupChange_1 + ' ' + this.userEditOnRoleRoleVal.title + ' ' + EN_messages.confirm_userGroupChange_2;
        if (await this.firstConfirmDialog({ messageTitle: text })) {
          const res = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.userEditOnRole, val);
          if (res)
            this.snackBarMessageSuccess(res);
        }
      }
    }
  }
  userEditOnRoleInsertRole = (val: any) => {
    this.userEditOnRoleRoleVal = val;
    console.log(this.userEditOnRoleRoleVal);

  }
  postNotifyDirectImage = (filesList: any, val: INotifyDirectImage): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('caption', val.caption);
    formData.append('userId', val.userId);
    formData.append('file', filesList[0]);

    return this.ajaxReqWrapperService.postBodyProgress(ENInterfaces.signalRNotifDirectImage, formData);

  }
  postNotifyDirectVideo = (filesList: any, val: INotifyDirectImage): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('caption', val.caption);
    formData.append('userId', val.userId);
    formData.append('file', filesList[0]);

    return this.ajaxReqWrapperService.postBodyProgress(ENInterfaces.signalRNotifDirectVideo, formData);

  }

}
