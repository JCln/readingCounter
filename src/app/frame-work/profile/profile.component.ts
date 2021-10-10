import { Component } from '@angular/core';
import { IChangePassword } from 'interfaces/inon-manage';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { IProfile } from 'interfaces/iuser-manager';
import { InteractionService } from 'services/interaction.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends FactoryONE {
 
  password: IChangePassword = { oldPassword: '', newPassword: '', confirmPassword: '' };
  myInfoDataSource: IProfile;
  _selectCols: IObjectIteratation[];

  constructor(
    public interactionService: InteractionService,
    private profileService: ProfileService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    this.myInfoDataSource = await this.profileService.getMyInfoDataSource();
    this.getSelectedColumns();
  }
  toDefaultPassword = () => {
    this.password.confirmPassword = '';
    this.password.newPassword = '';
    this.password.oldPassword = '';
  }
  changePassword = () => {
    this.profileService.changePassword(this.password);
    this.toDefaultPassword();
  }
  getSelectedColumns = () => {
    this._selectCols = this.profileService.columnSelectedProfile();
  }

}
