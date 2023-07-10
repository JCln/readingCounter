import { Component, Input } from '@angular/core';
import { appItems } from 'interfaces/iuser-manager';

@Component({
  selector: 'app-user-md-select-action',
  templateUrl: './user-md-select-action.component.html',
  styleUrls: ['./user-md-select-action.component.scss']
})
export class UserMdSelectActionComponent {
  @Input() userAddData: appItems[] = [];
  // swtich case title
  switchCaseName: string = '';
  // 
  changeSwitchCase = (item: string) => {
    this.switchCaseName = item;
  }

}
