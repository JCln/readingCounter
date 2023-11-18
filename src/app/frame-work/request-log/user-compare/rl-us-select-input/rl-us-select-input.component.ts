import { Component, Input, OnInit } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-rl-us-select-input',
  templateUrl: './rl-us-select-input.component.html',
  styleUrls: ['./rl-us-select-input.component.scss']
})
export class RlUsSelectInputComponent implements OnInit {
  @Input() dataSource: any;
  policyCompareColumns: string = 'userRoleHistoryDetails_UserInfo';
  _selectCols: any = [];

  constructor(
    public closeTabService: CloseTabService,
    public columnManager: ColumnManager
  ) { }

  ngOnInit(): void {
    this._selectCols = this.columnManager.getColumnsMenus(this.policyCompareColumns);
  }

}
