import { Component, Input } from '@angular/core';
import { appItems } from 'interfaces/iuser-manager';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent {
  @Input() userAddData: appItems[] = [];
  // swtich case title
  switchCaseName: string = '';
  // 
  changeSwitchCase = (item: string) => {
    this.switchCaseName = item;
  }
  toggleSubItems(completed: boolean, subTask: any) {
    subTask.forEach(t => {
      t.isSelected = completed
    });
  }

}
