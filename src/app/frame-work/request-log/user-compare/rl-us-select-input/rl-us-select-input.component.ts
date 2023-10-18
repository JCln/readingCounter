import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { IUserCompareManager } from 'interfaces/iuser-manager';
import { IUserDetailsHistory } from 'services/DI/privacies';
import { CloseTabService } from 'services/close-tab.service';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-rl-us-select-input',
  templateUrl: './rl-us-select-input.component.html',
  styleUrls: ['./rl-us-select-input.component.scss']
})
export class RlUsSelectInputComponent implements OnInit, AfterViewInit {
  @Input() dataSource: IUserCompareManager;
  policyCompareColumns: string = 'userRoleHistoryDetails_UserInfo';
  _selectCols = this.columnManager.getColumnsMenus(this.policyCompareColumns);

  constructor(
    public closeTabService: CloseTabService,
    public columnManager: ColumnManager
  ) { }


  insertSelectedColumns = () => {
    // console.log(1);

    // this._selectCols = this.columnManager.getColumnsMenus(this.policyCompareColumns);
    // console.log(this._selectCols);
    // console.log(this.dataSource);

  }

  ngAfterViewInit(): void {
    console.log(1);
    // console.log(this.dataSource[0]);
    // this.insertSelectedColumns();
  }
  ngOnInit(): void {
    console.log(1);
    // this.insertSelectedColumns();
  }

}
