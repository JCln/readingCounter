import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IUserManager } from 'interfaces/iuser-manager';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  dataSource: IUserManager;

  constructor(
    public config: DynamicDialogConfig,
    private utilsService: UtilsService,
  ) { }

  ActivateUser = async () => {
    const res = await this.utilsService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.userACTIVATE, this.dataSource.id);
    this.utilsService.snackBarMessageSuccess(res.message);
  }
  DeActivateUser = async () => {
    const res = await this.utilsService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.userDEACTIVATE, this.dataSource.id);
    this.utilsService.snackBarMessageSuccess(res.message);
  }
  resetPasswordUser = async () => {
    const res = await this.utilsService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.userRESETPASS, this.dataSource.id);
    this.utilsService.snackBarMessageSuccess(res.message);
  }
  unLockUser = async () => {
    const res = await this.utilsService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.unlockUser, this.dataSource.id);
    this.utilsService.snackBarMessageSuccess(res.message);
  }
  removeUser = async () => {
    const config = {
      messageTitle: EN_messages.confirm_removeingUser1 + this.dataSource.displayName + EN_messages.confirm_removeingUser2 + this.dataSource.username + EN_messages.confirm_IS,
      text: EN_messages.confirm_removeUser,
      width: '21rem',
      isInput: false,
      isDelete: true,
      isImportant: true,
      icon: 'pi pi-user-minus'
    }
    const confirmed = await this.utilsService.primeConfirmDialog(config);
    if (confirmed) {
      const res = await this.utilsService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.userRemove, this.dataSource.id);
      this.utilsService.snackBarMessageSuccess(res.message);
    }
  }
  classWrapper = async () => {
    this.dataSource = this.config.data._data;
  }
  ngOnInit(): void {
    this.classWrapper();
  }


}
