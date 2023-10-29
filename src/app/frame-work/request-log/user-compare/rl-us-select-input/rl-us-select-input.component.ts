import { Component, Input } from '@angular/core';
import { IUserCompareManager } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-rl-us-select-input',
  templateUrl: './rl-us-select-input.component.html',
  styleUrls: ['./rl-us-select-input.component.scss']
})
export class RlUsSelectInputComponent {
  @Input() dataSource: IUserCompareManager;
  policyCompareColumns: string = 'userRoleHistoryDetails_UserInfo';
  _selectCols = this.columnManager.getColumnsMenus(this.policyCompareColumns);

  constructor(
    public closeTabService: CloseTabService,
    public columnManager: ColumnManager
  ) { }

}
