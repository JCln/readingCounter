import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { ForbiddenService } from 'src/app/services/forbidden.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-forb-res',
  templateUrl: './forb-res.component.html',
  styleUrls: ['./forb-res.component.scss']
})
export class ForbResComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() dataSource: any[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private forbiddenService: ForbiddenService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) { }

  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.zoneId)
          dataSource.zoneId = zoneDic.title;
      })
    });
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  private insertSelectedColumns = () => {
    this._selectCols = this.forbiddenService.columnSelectedMenuDefault();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  nullSavedSource = () => this.closeTabService.saveDataForForbidden = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForForbidden) {
      this.dataSource = this.closeTabService.saveDataForForbidden;
    }
    else {
      this.dataSource = await this.forbiddenService.getDataSource();
      this.closeTabService.saveDataForForbidden = this.dataSource;
    }
    this.zoneDictionary = await this.forbiddenService.getZoneDictionary();
    this.convertIdToTitle(this.dataSource, this.zoneDictionary);
    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/fbn/res')
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
  backToPrevious = () => {
    this.forbiddenService.backToParent();
  }
  showPictures = (forbiddenId: string) => {
    this.forbiddenService.routeToWOUI(forbiddenId, true);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}
