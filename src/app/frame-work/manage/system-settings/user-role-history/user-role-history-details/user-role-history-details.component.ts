import { AfterViewInit, Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IPolicies } from 'services/DI/privacies';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-user-role-history-details',
  templateUrl: './user-role-history-details.component.html',
  styleUrls: ['./user-role-history-details.component.scss']
})
export class UserRoleHistoryDetailsComponent implements AfterViewInit {
  dataSource: IPolicies;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public columnManager: ColumnManager
  ) {
  }
  classWrapper = async () => {
    this.dataSource = this.config.data;
  }
  ngAfterViewInit(): void {
    this.classWrapper();
  }

}
