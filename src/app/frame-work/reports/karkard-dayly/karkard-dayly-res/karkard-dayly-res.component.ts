import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IReadingReportKarkard } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

@Component({
  selector: 'app-karkard-dayly-res',
  templateUrl: './karkard-dayly-res.component.html',
  styleUrls: ['./karkard-dayly-res.component.scss']
})
export class KarkardDaylyResComponent implements OnInit {
  @Input() dataSource: IReadingReportKarkard[];
  readingReportKarkardDaily: IReadingReportKarkard[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

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
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnSelectedRRKarkardDaly();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  convertKarbariIdToTitle = (dataSource: any[], karbariDictionary: IDictionaryManager[]) => {
    karbariDictionary.map(karbariDic => {
      dataSource.map(dataSource => {
        if (dataSource.karbariCode == karbariDic.id) {
          dataSource.karbariCode = karbariDic.title;
        }
      })
    });
  }
  connectToServer = async () => {
    this.readingReportKarkardDaily = await this.readingReportManagerService.postRRKarkardDailyManager();
    if (!this.readingReportKarkardDaily.length) {
      this.readingReportManagerService.emptyMessage();
      return;
    }
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.convertKarbariIdToTitle(this.dataSource, this.karbariDictionary);
  }
  ngOnInit(): void {
    this.connectToServer();
    this.insertSelectedColumns();
  }
  refreshTable = () => {
    this.ngOnInit();
  }
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
  }

}