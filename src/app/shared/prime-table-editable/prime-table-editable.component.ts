import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ENSelectedColumnVariables } from 'interfaces/ioverall-config';
import { Table } from 'primeng/table';
import { BrowserStorageService } from 'services/browser-storage.service';
import { OutputManagerService } from 'services/output-manager.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { FactorySharedPrime } from 'src/app/classes/factory';

@Component({
  selector: 'app-prime-table-editable',
  templateUrl: './prime-table-editable.component.html',
  styleUrls: ['./prime-table-editable.component.scss']
})
export class PrimeTableEditableComponent extends FactorySharedPrime {
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
  @Input() _isCustomSort: boolean = false;

  @Input() _hasSaveColumns: boolean = true;
  @Input() newRow: object;
  @Input() newRowLimit: number;
  @Input() dictionary = new EventEmitter<any>();
  @Input() secondDictionary = new EventEmitter<any>();

  @Output() backedToPrevious = new EventEmitter<any>();
  @Output() filteredEvent = new EventEmitter<any>();
  @Output() showedWOUIAsCarousel = new EventEmitter<any>();
  @Output() showedInMapSingle = new EventEmitter<any>();
  @Output() showedPictures = new EventEmitter<any>();
  @Output() customedSort = new EventEmitter<any>();
  @Output() receivedDateJalali = new EventEmitter<any>();
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
  @Output() openedMoshtarakinDialog = new EventEmitter<any>();

  constructor(
    public outputManagerService: OutputManagerService,
    public browserStorageService: BrowserStorageService,
    public columnManager: ColumnManager,
    public utilsService: UtilsService
  ) {
    super(
      browserStorageService,
      utilsService,
      columnManager
    );
  }

  refreshTable() {
    this.refreshedTable.emit(true);
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
  backToPrevious = () => {
    this.backedToPrevious.emit(true);
  }
  filterEventTable(e: Table) {
    this.filteredEvent.emit(e.filteredValue);
  }
  showWOUIAsCarousel = (dataSource: any, ri: number) => {
    this.showedWOUIAsCarousel.emit({ dataSource, ri });
  }
  showPictures = ($event) => {
    this.showedPictures.emit($event);
  }
  showInMapSingle = (dataSource: object) => {
    this.showedInMapSingle.emit(dataSource);
  }
  customSort = (dataSource: any) => {
    this.customedSort.emit(dataSource);
  }
  receiveDateJalali = (event: string, ri: number) => {
    // it may work only for General modify component
    this.dataSource[ri].offloadDateJalali = event;
    this.receivedDateJalali.emit(event);
  }
  openMoshtarakinDialog = (dataSource: object) => {
    this.openedMoshtarakinDialog.emit(dataSource);
  }

}
