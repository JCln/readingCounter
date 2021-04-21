import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { FragmentManagerService } from 'src/app/services/fragment-manager.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IFragmentDetails } from './../../../../Interfaces/imanage';

@Component({
  selector: 'app-fragment-details',
  templateUrl: './fragment-details.component.html',
  styleUrls: ['./fragment-details.component.scss']
})
export class FragmentDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: IFragmentDetails[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  _masterId: string = '';
  table: Table;
  clonedProducts: { [s: string]: IFragmentDetails; } = {};

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService,
    private router: Router,
    private utilsService: UtilsService
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
    this.insertSelectedColumns();
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.fragmentManagerService.columnSelectedFragmentDetails();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  private getRouteParams = () => {
    this.subscription.push(this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res) {
          this._masterId = this.fragmentManagerService.getRouteParams();
          this.classWrapper();
        }
      }
    })
    )
  }
  ngOnInit(): void {

  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/m/nob/'))
          this.classWrapper(true);
      }
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
  refreshTable = () => this.classWrapper(true);
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  newRow(): IFragmentDetails {
    return { routeTitle: '', fromEshterak: '', toEshterak: '', fragmentMasterId: this._masterId };
  }
  onRowEditInit(dataSource: IFragmentDetails) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditCancel(dataSource: IFragmentDetails, index: number) {
    this.dataSource[index] = this.clonedProducts[dataSource.id];
    delete this.dataSource[dataSource.id];
    // execption when exiting row edited false
    if (!this.fragmentManagerService.ValidationDetailsNoMessage(dataSource)) {
      if (dataSource.id)
        return;
      if (this.utilsService.isNull(dataSource.fromEshterak) || this.utilsService.isNull(dataSource.toEshterak))
        this.dataSource.shift();
    }
  }
  removeRow = (dataSource: IFragmentDetails, index: number) => {
    if (!this.fragmentManagerService.verificationDetails(dataSource))
      return;
    const a = this.fragmentManagerService.removeFragmentDetails(dataSource);
    if (a) {
      this.dataSource[index] = this.clonedProducts[dataSource.id];
      delete this.dataSource[dataSource.id];
      this.refetchTable(index);
    }
  }
  onRowEditSave(dataSource: IFragmentDetails, rowIndex: number) {
    if (!this.fragmentManagerService.verificationDetails(dataSource)) {
      if (this.utilsService.isNull(dataSource.fromEshterak) || this.utilsService.isNull(dataSource.toEshterak))
        this.dataSource.shift();
      return;
    }
    if (!dataSource.id) {
      this.onRowAdd(dataSource);
    }
    else {
      this.fragmentManagerService.editFragmentDetails(dataSource);
    }
    this.table.initRowEdit(dataSource); // add to table automatically
    this.refetchTable(rowIndex)
  }
  onRowAdd(dataSource: IFragmentDetails) {
    if (!this.fragmentManagerService.verificationDetails(dataSource)) {
      this.dataSource.shift();
      return;
    }
    this.fragmentManagerService.addFragmentDetails(dataSource);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}