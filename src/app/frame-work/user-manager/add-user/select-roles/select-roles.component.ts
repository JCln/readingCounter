import { Component, Input } from '@angular/core';
import { IRoleItems } from 'src/app/Interfaces/iuser-manager';

@Component({
  selector: 'app-select-roles',
  templateUrl: './select-roles.component.html',
  styleUrls: ['./select-roles.component.scss']
})
export class SelectRolesComponent {

  @Input() roleItems: IRoleItems[] = [];
}
