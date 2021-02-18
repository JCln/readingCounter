import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { ITracking } from 'src/app/Interfaces/imanage';
import { IResponses } from 'src/app/Interfaces/iresponses';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';


@Component({
  selector: 'app-imported',
  templateUrl: './imported.component.html',
  styleUrls: ['./imported.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class ImportedComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: ITracking[] = [];
  filterZoneDictionary: IDictionaryManager[] = [];
  visibility: boolean = true;

  selectedFuckingTest: any[] = []
  _selectCols: any[] = [];
  _selectedColumns: any[];
  _selectedInnerColumns: any[];

  _firstPage: number = 0;
  _rowsNumberPage: number = 10;

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private trackingManagerService: TrackingManagerService
  ) {
  }

  removeRow = (rowData: ITracking) => {
    this.trackingManagerService.removeTrackingId(rowData.id);
  }
  getZoneDictionary = (): Promise<any> => {
    return new Promise((resolve) => {
      this.trackingManagerService.getAllZoneTitles().subscribe(res => {
        resolve(res);
      })
    });
  }
  getDataSource = (): Promise<ITracking[]> => {
    return new Promise((resolve) => {
      this.trackingManagerService.getImportedDataSource().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  nullSavedSource = () => this.closeTabService.saveDataForTrackImported = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackImported) {
      this.dataSource = this.closeTabService.saveDataForTrackImported;
    }
    else {
      this.dataSource = await this.getDataSource();
      // this.filterZoneDictionary = this.trackingManagerService.getAllZoneTitles(this.dataSource);
      this.filterZoneDictionary = await this.getZoneDictionary();
      console.log(this.filterZoneDictionary);


      this.closeTabService.saveDataForTrackImported = this.dataSource;
    }
  }
  onRowEditInit(product: any) {
    console.log(product);
  }
  onRowEditSave(rowData: any) {
    this.trackingManagerService.postEditingTrack(rowData).subscribe((res: IResponses) => {
      if (res) {
        this.trackingManagerService.successSnackMessage(res.message);
      }
    });

  }
  onRowEditCancel(product: any, index: number) {
    console.log(product + '   ' + index);

    // this.products2[index] = this.clonedProducts[product.id];
    // delete this.clonedProducts[product.id];
  }
  next = () => this._firstPage = this._firstPage + this._rowsNumberPage;
  prev = () => this._firstPage = this._firstPage - this._rowsNumberPage;
  reset = () => this._firstPage = 0;
  isLastPage = (): boolean => { return this.dataSource ? this._firstPage === (this.dataSource.length - this._rowsNumberPage) : true; }
  isFirstPage = (): boolean => { return this.dataSource ? this._firstPage === 0 : true; }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.trackingManagerService.columnSelectedMenuDefault();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
    this.insertSelectedColumns();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/track/imported')
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
  refreshTable = () => {
    this.classWrapper(true);
  }

}