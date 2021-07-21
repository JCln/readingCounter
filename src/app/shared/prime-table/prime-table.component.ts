import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';

@Component({
  selector: 'app-prime-table',
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.scss']
})
export class PrimeTableComponent implements OnInit {
  @Input() dataSource: any[] = [];
  @Input() _selectCols: any = [];
  @Input() _selectedColumns: any[];
  @Input() _outputFileName: string;
  @Input() _rowsPerPage: number[] = [20, 50, 100, 500];
  @Input() _numberOfExtraColumns: number[];
  @Input() _sessionName: string;

  @Output() refreshedTable = new EventEmitter<boolean>();
  @Output() forcedOffload = new EventEmitter<any>();
  @Output() backedToImportedConfirmDialog = new EventEmitter<any>();
  @Output() routedToLMPayDay = new EventEmitter<any>();
  @Output() routedToLMAll = new EventEmitter<any>();
  @Output() showedMoreDetails = new EventEmitter<any>();
  @Output() firstConfirmedDialog = new EventEmitter<any>();
  @Output() showedInMap = new EventEmitter<any>();

  _rowsNumbers = 20;

  constructor(
    public outputManagerService: OutputManagerService,
    public trackingManagerService: TrackingManagerService
  ) { }

  ngOnInit(): void {
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

  refreshTable() {
    this.refreshedTable.emit(true);
  }
  forceOffload = (dataSource: object, ri: number) => {
    this.forcedOffload.emit(dataSource);
  }
  backToImportedConfirmDialog = (dataSource: object, ri: number) => {
    this.backedToImportedConfirmDialog.emit(dataSource);
  }
  routeToLMPayDay = (dataSource: object) => {
    this.routedToLMPayDay.emit(dataSource);
  }
  routeToLMAll = (dataSource: object) => {
    this.routedToLMAll.emit(dataSource);
  }
  showMoreDetails = (dataSource: object) => {
    this.showedMoreDetails.emit(dataSource);
  }
  firstConfirmDialog = (dataSource: object, ri: number) => {
    this.firstConfirmedDialog.emit(dataSource);
  }
  showInMap = (trackNumber , insertDateJalali) => {
    this.showedInMap.emit(trackNumber , insertDateJalali);
  }

}
