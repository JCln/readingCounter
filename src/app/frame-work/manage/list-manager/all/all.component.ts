import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IListManagerAll } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ListManagerService } from 'src/app/services/list-manager.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit, AfterViewInit, OnDestroy {
  trackId: string;
  subscription: Subscription[] = [];

  dataSource: IListManagerAll[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private route: ActivatedRoute,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private listManagerService: ListManagerService,
    private router: Router
  ) {
    this.getRouteParams();
  }
  convertIdToTitle = (dataSource: any[], zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (dataSource.zoneId == zoneDic.id) {
          dataSource.zoneId = zoneDic.title;
        }
      })
    });
  }
  getZoneDictionary = (): any => {
    return new Promise((resolve) => {
      this.listManagerService.getLMAllZoneDictionary().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }

  getDataSource = (): Promise<IListManagerAll[]> => {
    return new Promise((resolve) => {
      this.listManagerService.getLMAll(this.trackId).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  nullSavedSource = () => this.closeTabService.saveDataForLMAll = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.getDataSource();
    this.zoneDictionary = await this.getZoneDictionary();
    console.log(this.zoneDictionary);
    this.convertIdToTitle(this.dataSource, this.zoneDictionary);
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.listManagerService.columnSelectedLMAll();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  getRouteParams = () => {
    this.subscription.push(this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.trackId = this.route.snapshot.paramMap.get('trackingId');
        this.classWrapper();
        this.insertSelectedColumns();
      }
    })
    )
  }
  ngOnInit(): void {
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/m/l/all/'))
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
  downloadOutputDBF = (row: IListManagerAll) => {
    this.router.navigate(['wr/m/track/woui', row.id]);

    // if (!this.outputManagerService.checkVertification(row))
    //   return;
    // this.trackingManagerService.downloadOutputDBF(row).subscribe((res: Blob) => {
    //   this.outputManagerService.downloadFile(res);
    //   console.log(res);

    // })

  }
}