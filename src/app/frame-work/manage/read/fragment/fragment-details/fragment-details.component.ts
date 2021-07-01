import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { IFragmentDetails } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { FragmentManagerService } from 'src/app/services/fragment-manager.service';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-fragment-details',
  templateUrl: './fragment-details.component.html',
  styleUrls: ['./fragment-details.component.scss']
})
export class FragmentDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  table: Table;
  newRowLimit: number = 1;

  dataSource: IFragmentDetails[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  _masterId: string = '';
  clonedProducts: { [s: string]: IFragmentDetails; } = {};

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService,
    private router: Router
  ) {
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
  ngOnInit(): void {

  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res.includes('/wr/m/r/nob/'))
        this.classWrapper(true);
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  testChangedValue() {
    this.newRowLimit = 2;
  }
  refreshTable = () => this.classWrapper(true);
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  newRow(): IFragmentDetails {
    return { routeTitle: '', fromEshterak: '', toEshterak: '', fragmentMasterId: this._masterId, isNew: true };
  }
  onRowEditInit(dataSource: IFragmentDetails) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.fragmentMasterId] = { ...dataSource };
  }
  onRowEditCancel(dataSource: IFragmentDetails, index: number) {
    this.newRowLimit = 1;
    this.dataSource[index] = this.clonedProducts[dataSource.fragmentMasterId];
    delete this.dataSource[dataSource.id];
    if (dataSource.isNew)
      this.dataSource.shift();
    return;
  }
  removeRow = async (dataSource: IFragmentDetails, index: number) => {
    this.newRowLimit = 1;

    if (!this.fragmentManagerService.verificationDetails(dataSource))
      return;
    const a = await this.fragmentManagerService.removeFragmentDetails(dataSource);
    if (a) {
      this.dataSource[index] = this.clonedProducts[dataSource.fragmentMasterId];
      delete this.dataSource[dataSource.id];
      this.refetchTable(index);
    }
  }
  onRowEditSave(dataSource: IFragmentDetails, rowIndex: number) {
    this.newRowLimit = 1;
    if (!this.fragmentManagerService.verificationDetails(dataSource)) {
      if (dataSource.isNew) {
        this.dataSource.shift();
        return;
      }
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.fragmentMasterId];
      return;
    }
    if (!dataSource.id) {
      this.onRowAdd(dataSource, rowIndex);
    }
    else {
      this.fragmentManagerService.editFragmentDetails(dataSource);
    }
  }
  async onRowAdd(dataSource: IFragmentDetails, rowIndex: number) {
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
}