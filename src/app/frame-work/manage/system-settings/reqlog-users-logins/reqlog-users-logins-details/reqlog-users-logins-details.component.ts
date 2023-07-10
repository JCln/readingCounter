import { IUsersLoginBriefInfo } from 'services/DI/privacies';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-reqlog-users-logins-details',
  templateUrl: './reqlog-users-logins-details.component.html',
  styleUrls: ['./reqlog-users-logins-details.component.scss']
})
export class ReqlogUsersLoginsDetailsComponent implements OnInit {
  dataSource: IUsersLoginBriefInfo;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public columnManager: ColumnManager
  ) {
  }
  classWrapper = async () => {
    this.dataSource = this.config.data;
  }
  ngOnInit(): void {
    this.classWrapper();
  }

}
