import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentDetails } from 'interfaces/ireads-manager';
import { Table } from 'primeng/table';
import { filter } from 'rxjs/internal/operators/filter';
import { CloseTabService } from 'services/close-tab.service';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { FactoryONE } from 'src/app/classes/factory';


@Component({
  selector: 'app-fragment-details',
  templateUrl: './fragment-details.component.html',
  styleUrls: ['./fragment-details.component.scss']
})
export class FragmentDetailsComponent extends FactoryONE {
  table: Table;
  newRowLimit: number = 1;

  dataSource: IFragmentDetails[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  _masterId: string = '';
  clonedProducts: { [s: string]: IFragmentDetails; } = {};

  constructor(
    private closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService,
    private router: Router
  ) {
    super();
    this.getRouteParams();
  }

  nullSavedSource = () => this.closeTabService.saveDataForFragmentNOBDetails = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.fragmentManagerService.getFragmentDetails(this._masterId);
    this.closeTabService.saveDataForFragmentNOBDetails = this.dataSource;
    this.defaultAddStatus();
    this.insertSelectedColumns();
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = this.fragmentManagerService.columnSelectedFragmentDetails();
    this._selectedColumns = this.fragmentManagerService.customizeSelectedColumns(this._selectCols);
  }
  private getRouteParams = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this._masterId = this.fragmentManagerService.getRouteParams();
      this.classWrapper();
    })
    )
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  newRow(): IFragmentDetails {
    return { routeTitle: '', fromEshterak: '', toEshterak: '', fragmentMasterId: this._masterId, isNew: true };
  }
  onRowEditInit(dataSource: IFragmentDetails) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.fragmentMasterId] = { ...dataSource };
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].fragmentMasterId];
    delete this.dataSource[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.dataSource.shift();
    return;
  }
  removeRow = async (dataSource: object) => {
    this.newRowLimit = 1;

    if (!this.fragmentManagerService.verificationDetails(dataSource['dataSource']))
      return;
    const confirmed = await this.fragmentManagerService.firstConfirmDialog();
    if (!confirmed) return;
    const a = await this.fragmentManagerService.removeFragmentDetails(dataSource['dataSource']);
    if (a) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].fragmentMasterId];
      delete this.dataSource[dataSource['dataSource'].id];
      this.refetchTable(dataSource['ri']);
    }
  }
  onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.fragmentManagerService.verificationDetails(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.dataSource.shift();
        return;
      }
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].fragmentMasterId];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      this.fragmentManagerService.editFragmentDetails(dataSource['dataSource']);
    }
  }
  private async onRowAdd(dataSource: IFragmentDetails, rowIndex: number) {
    const a = await this.fragmentManagerService.addFragmentDetails(dataSource);
    if (a) {
      this.refetchTable(rowIndex);
      this.refreshTable();
    }
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  routeToParent = () => this.router.navigate(['/wr/m/r/nob']);
  ngOnInit(): void { return; }
}