import { Component, Input } from '@angular/core';
import { IUserInfo } from 'interfaces/iuser-manager';


@Component({
  selector: 'app-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss']
})
export class UserInputsComponent {
  @Input() editInfo: IUserInfo;
}
