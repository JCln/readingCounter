import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IPolicies, IRoleHistory } from 'services/DI/privacies';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-role-history-details',
  templateUrl: './role-history-details.component.html',
  styleUrls: ['./role-history-details.component.scss']
})
export class RoleHistoryDetailsComponent implements OnInit {
  dataSource: IRoleHistory;

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
