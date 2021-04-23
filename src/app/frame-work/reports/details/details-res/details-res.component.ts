import { Component, Input, OnInit } from '@angular/core';
import { IReadingReportDetails } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';

@Component({
  selector: 'app-details-res',
  templateUrl: './details-res.component.html',
  styleUrls: ['./details-res.component.scss']
})
export class DetailsResComponent implements OnInit {
  @Input() dataSource: IReadingReportDetails[] = [];
  karbariDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
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
    this.dataSource = await this.readingReportManagerService.postRRDetailsManager();
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.convertKarbariIdToTitle(this.dataSource, this.karbariDictionary);

    if (this.dataSource.length)
      this.insertSelectedColumns();
  }

  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnSelectedRRDetails();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.connectToServer();
  }
  refreshTable = () => {
    this.ngOnInit();
  }
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
  }
  // exportPDF = () => {
  //   const exportColumns = this._selectCols.map(col => ({ title: col.header, dataKey: col.field }));
  //   this.outputManagerService.exportPdf(this.dataSource, exportColumns);
  // } 
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}
