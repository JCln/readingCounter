import { Component, Input } from '@angular/core';
import { IUserRoleCompare } from 'interfaces/iuser-manager';

@Component({
  selector: 'app-uc-role-zone',
  templateUrl: './uc-role-zone.component.html',
  styleUrls: ['./uc-role-zone.component.scss']
})
export class UcRoleZoneComponent {
  @Input() dataSource: IUserRoleCompare;
}
