import { Component, Input, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingReportDetails } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

@Component({
  selector: 'app-details-res',
  templateUrl: './details-res.component.html',
  styleUrls: ['./details-res.component.scss']
})
export class DetailsResComponent implements OnInit {
  dataSource: IReadingReportDetails[] = [];
  karbariDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public outputManagerService: OutputManagerService,
    private utilsService: UtilsService
  ) {
  }

  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.postRRManager('wr/rpts/exm/details', ENInterfaces.ReadingReportDETAILSWithParam, 'readingReportReq');
    if (this.utilsService.isNull(this.dataSource))
      return;

    this.karbariDictionary = await this.readingReportManagerService.getKarbariDictionary();
    Converter.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    this.insertSelectedColumns();

  }

  insertSelectedColumns = () => {
    this._selectCols = this.readingReportManagerService.columnRRDetails();
    this._selectedColumns = this.readingReportManagerService.customizeSelectedColumns(this._selectCols);
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
