import { Component, Input } from '@angular/core';
import { IRoleItems } from 'interfaces/iuser-manager';
import { UsersAllService } from 'services/users-all.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent {
  selectedRole: number;
  @Input() roleItems: IRoleItems[] = [];

  constructor(
    private usersAllService: UsersAllService,
  ) { }
  changeRadio = ($event: any) => {
    this.selectedRole = $event.id;
    this.usersAllService.userEditOnRoleInsertRole($event);
  }

}
