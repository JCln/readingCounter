import { Component, OnInit } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginBriefInfo } from 'services/DI/privacies';
import { DateJalaliService } from 'services/date-jalali.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { Converter } from 'src/app/classes/converter';

@Component({
  selector: 'app-my-previous-failures',
  templateUrl: './my-previous-failures.component.html',
  styleUrls: ['./my-previous-failures.component.scss']
})
export class MyPreviousFailuresComponent implements OnInit {
  dataSource: LoginBriefInfo[] = [];
  _selectCols: any = [];
  invalidLoginReasonIdDictionary: IDictionaryManager[] = [];
  myPreviousFailuresColumns: string = 'myPreviousFailures';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private columnManager: ColumnManager,
    private utilsService: UtilsService,
    private dateJalaliService: DateJalaliService
  ) { }

  convertLoginTime = () => {
    this.dataSource.forEach(item => {
      item.loginDateTime = this.dateJalaliService.getDate(item.loginDateTime) + '   ' + this.dateJalaliService.getTime(item.loginDateTime);
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.columnManager.columnSelectedMenus(this.myPreviousFailuresColumns);
  }
  ngOnInit(): void {
    console.log(this.config.data);
    this.dataSource = this.config.data;
    this.invalidLoginReasonIdDictionary = this.utilsService.getInvalidLoginReason();
    this.insertSelectedColumns();
    this.convertLoginTime();
    Converter.convertIdToTitle(this.dataSource, this.invalidLoginReasonIdDictionary, 'invalidLoginReasonId');
  }

  close() {
    this.ref.close();
  }

}