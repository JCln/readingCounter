import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-uc-role-roles',
  templateUrl: './uc-role-roles.component.html',
  styleUrls: ['./uc-role-roles.component.scss']
})
export class UcRoleRolesComponent {
  @Input() userAddData;
}
