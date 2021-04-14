import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

import { IReadingReportTraverseDifferentialRes } from './../../../../Interfaces/imanage';

@Component({
  selector: 'app-trvch-res',
  templateUrl: './trvch-res.component.html',
  styleUrls: ['./trvch-res.component.scss']
})
export class TrvchResComponent implements OnInit, OnDestroy {
  dataSource: IReadingReportTraverseDifferentialRes[] = [];

  subscription: Subscription[] = [];
  karbariDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private readingReportManagerService: ReadingReportManagerService,
    public outputManagerService: OutputManagerService
  ) {
  }

  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  convertKarbariIdToTitle = (dataSource: any[], dictionary: IDictionaryManager[]) => {
    dictionary.map(diction => {
      dataSource.map(dataSource => {
        if (dataSource.karbariCode == diction.id) {
          dataSource.karbariCode = diction.title;
        }
      })
    });
  }

  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnSelectedRRTraverseDifferential();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRTraverseDiffrentialManager();
    if (!this.dataSource.length) {
      this.readingReportManagerService.emptyMessage();
      return;
    }
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.connectToServer();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.ngOnInit();
  }
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}
