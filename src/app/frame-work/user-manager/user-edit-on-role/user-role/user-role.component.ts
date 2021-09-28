import { Component, Input } from '@angular/core';
import { IRoleItems } from 'interfaces/iuser-manager';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent {
  @Input() roleItems: IRoleItems[] = [];
}
