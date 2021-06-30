import { Component, Input, OnInit } from '@angular/core';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IReadingReportTraverse } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadingReportManagerService } from 'src/app/services/reading-report-manager.service';
import { UtilsService } from 'src/app/services/utils.service';


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
    public readingReportManagerService: ReadingReportManagerService,
    public outputManagerService: OutputManagerService,
    private utilsService: UtilsService
  ) {
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRTraverse();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
  }
  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRManager('wr/rpts/mam/trv', ENInterfaces.ListTraverse, 'readingReportReq');
    if (this.utilsService.isNull(this.dataSource))
      return;
    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    this.outputManagerService.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
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
