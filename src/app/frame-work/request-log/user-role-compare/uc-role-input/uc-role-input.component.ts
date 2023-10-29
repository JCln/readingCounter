import { Component, Input } from '@angular/core';
import { IUserCompareManager } from 'interfaces/iuser-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-uc-role-input',
  templateUrl: './uc-role-input.component.html',
  styleUrls: ['./uc-role-input.component.scss']
})
export class UcRoleInputComponent {
  @Input() dataSource: IUserCompareManager;
  policyCompareColumns: string = 'userRoleCompare_UserInfo';
  _selectCols = this.columnManager.getColumnsMenus(this.policyCompareColumns);

  constructor(
    public closeTabService: CloseTabService,
    public columnManager: ColumnManager
  ) { }

}
