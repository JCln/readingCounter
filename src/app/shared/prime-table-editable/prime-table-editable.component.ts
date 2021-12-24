import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSelectedColumnVariables } from 'interfaces/ioverall-config';
import { BrowserStorageService } from 'services/browser-storage.service';
import { OutputManagerService } from 'services/output-manager.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-prime-table-editable',
  templateUrl: './prime-table-editable.component.html',
  styleUrls: ['./prime-table-editable.component.scss']
})
export class PrimeTableEditableComponent {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  @Input() dataSource: any[] = [];
  @Input() _selectCols: any = [];
  @Input() _selectedColumns: any[];
  @Input() _outputFileName: string;
  @Input() _rowsPerPage: number[] = [10, 100, 1000, 5000];
  @Input() _numberOfExtraColumns: number[];
  @Input() _sessionName: string;
  @Input() _sortBy: string;
  @Input() _rowsNumbers = 10;
  @Input() _selectedColumnsToRemember: string;
  @Input() _backToPreviousText: string;
  @Input() _captionEnabled: boolean = true;
  @Input() _sortField: string = '';
  @Input() _sortOrder: string = '';
  @Input() _outputEnabled: boolean = true;
  @Input() _backToPreviousEnabled: boolean = false;
  @Input() _checkUpName: string = '';
  @Input() _multiSelectEnable: boolean = true;
  @Input() _isInRowEditing: boolean = false;
  @Input() _dictionaryName: string = '';
  @Input() _secondDictionaryName: string = '';

  @Input() newRow: object;
  @Input() newRowLimit: number;
  @Input() dictionary = new EventEmitter<any>();
  @Input() secondDictionary = new EventEmitter<any>();

  @Output() refreshedTable = new EventEmitter<boolean>();
  @Output() onRowEditedInit = new EventEmitter<any>();
  @Output() onRowEditedSave = new EventEmitter<any>();
  @Output() onRowEditedCancel = new EventEmitter<any>();
  @Output() onRowEditedCancelRowEditing = new EventEmitter<any>();
  @Output() removedRow = new EventEmitter<any>();
  @Output() removedRowEditing = new EventEmitter<any>();
  @Output() openedAddDialog = new EventEmitter<any>();
  @Output() newedRowChangedStatus = new EventEmitter<any>();
  @Output() getedExcelSample = new EventEmitter<any>();
  @Output() openedAddExcelDialog = new EventEmitter<any>();
  @Output() routedToParent = new EventEmitter<any>();
  @Input() _hasSaveColumns: boolean = true;

  _showSavedColumnButton: boolean = false;

  constructor(
    public outputManagerService: OutputManagerService,
    private browserStorageService: BrowserStorageService,
    public columnManager: ColumnManager,
    private utilsService: UtilsService
  ) { }

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
  saveColumns() {
    let newArray: any[] = [];
    for (let i = 0; i < this._selectCols.length; i++) {
      let element = this._selectCols[i];
      element.isSelected = false;
      newArray.push(element);
      for (let j = 0; j < this._selectedColumns.length; j++) {
        if (this._selectCols[i].field == this._selectedColumns[j].field) {
          element.isSelected = true;
          newArray[i].isSelected = true;
        }
      }
    }

    this.browserStorageService.set(this._outputFileName, newArray);
    this.utilsService.snackBarMessageSuccess(EN_messages.tableSaved);
    if (!this.browserStorageService.isExists(this._outputFileName))
      this._showSavedColumnButton = true;
  }
  ngOnChanges(): void {
    if (!MathS.isNull(this._outputFileName)) {

      if (this.browserStorageService.isExists(this._outputFileName)) {
        this._selectCols = this.browserStorageService.get(this._outputFileName);
        this._showSavedColumnButton = false;
      }
      else {
        this._selectCols = this.columnManager.columnSelectedMenus(this._outputFileName);
        this._showSavedColumnButton = true;
      }
      this._selectedColumns = this.columnManager.customizeSelectedColumns(this._selectCols);
    }
  }

  resetSavedColumns = () => {
    if (!MathS.isNull(this._outputFileName)) {
      if (this.browserStorageService.isExists(this._outputFileName)) {
        this.browserStorageService.removeLocal(this._outputFileName);
        this._showSavedColumnButton = true;
        this.utilsService.snackBarMessageSuccess(EN_messages.tableResetSaved);
      }
    }
    else
      this.utilsService.snackBarMessageWarn(EN_messages.done);
  }

  onRowEditInit = (dataSource: object) => {
    this.onRowEditedInit.emit(dataSource);
  }
  onRowEditSave = (dataSource: object, ri: number) => {
    this.onRowEditedSave.emit({ dataSource, ri });
  }
  onRowEditCancel = (dataSource: object, ri: number) => {
    this.onRowEditedCancel.emit({ dataSource, ri });
  }
  removeRow = (dataSource: object, ri: number) => {
    this.removedRow.emit({ dataSource, ri });
  }
  removeRowEditing = (dataSource: object, ri: number) => {
    this.removedRowEditing.emit({ dataSource, ri })
  }
  openAddDialog = () => {
    this.openedAddDialog.emit();
  }
  newRowChangedStatus = () => {
    this.newedRowChangedStatus.emit();
  }
  onRowEditCancelRowEditing = (dataSource: object, ri: number) => {
    this.onRowEditedCancelRowEditing.emit({ dataSource, ri });
  }
  getExcelSample = () => {
    this.getedExcelSample.emit();
  }
  openAddExcelDialog = () => {
    this.openedAddExcelDialog.emit();
  }
  routeToParent = () => {
    this.routedToParent.emit();
  }

}
