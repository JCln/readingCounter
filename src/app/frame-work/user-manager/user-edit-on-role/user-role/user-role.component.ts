import { Component, Input } from '@angular/core';
import { IRoleItems } from 'interfaces/iuser-manager';
import { UserEditManagerService } from 'services/user-edit-manager.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent {
  selectedRole: number;
  @Input() roleItems: IRoleItems[] = [];

  constructor(
    private userEditManagerService: UserEditManagerService
  ) { }
  changeRadio = ($event: any) => {
    this.selectedRole = $event.value;
    this.userEditManagerService.userEditOnRoleInsertRole(this.selectedRole);
  }

}
