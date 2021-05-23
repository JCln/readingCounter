import { Component, Input, OnInit } from '@angular/core';
import { IReadingReportTraverse } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';


@Component({
  selector: 'app-traverse-res',
  templateUrl: './traverse-res.component.html',
  styleUrls: ['./traverse-res.component.scss']
})
export class TraverseResComponent implements OnInit {
  @Input() dataSource: IReadingReportTraverse[] = [];
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
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnSelectedRRTraverse();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRTraverseManager();
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.outputManagerService.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');

    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.connectToServer();
  }
  backToPrevious = () => {
    this.readingReportManagerService.backToPreviousPage();
  }
  refreshTable = () => {
    this.ngOnInit();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}
