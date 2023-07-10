import { ColumnManager } from 'src/app/classes/column-manager';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPolicies } from 'services/DI/privacies';

@Component({
  selector: 'app-policy-history-details',
  templateUrl: './policy-history-details.component.html',
  styleUrls: ['./policy-history-details.component.scss']
})
export class PolicyHistoryDetailsComponent implements OnInit {
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
  ngOnInit(): void {
    this.classWrapper();
  }

}
