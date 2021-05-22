import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

@Component({
  selector: 'app-qotr',
  templateUrl: './qotr.component.html',
  styleUrls: ['./qotr.component.scss']
})
export class QotrComponent implements OnInit, AfterViewInit, OnDestroy {
  idFilter = new FormControl('');
  titleFilter = new FormControl('');
  provinceIdFilter = new FormControl('');
  provinceFilter = new FormControl('');

  dataSource = new MatTableDataSource();
  
  subscription: Subscription[] = [];
  countryDictionary: IDictionaryManager[] = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplay = ['title', 'provinceId', 'province', 'actions'];
  filterValues = {
    id: '',
    title: '',
    provinceId: '',
    province: ''
  };

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  convertIdToTitle = (dataSource: any[], zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (zoneDic.id === dataSource.provinceId)
          dataSource.provinceId = zoneDic.title;
      })
    });
  }
  getProvinceDictionary = (): any => {
    return this.dictionaryWrapperService.getProvinceDictionary();
  }
  getDataSource = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getQotr().subscribe(res => {
        resolve(res);
      })
    })
  }
  filterSearchs = () => {
    this.dataSource.paginator = this.paginator;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filterPredicate = this.createFilter();

    this.titleFilter.valueChanges
      .subscribe(
        title => {
          this.filterValues.title = title;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.provinceIdFilter.valueChanges
      .subscribe(
        provinceId => {
          this.filterValues.provinceId = provinceId;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.provinceFilter.valueChanges
      .subscribe(
        province => {
          this.filterValues.province = province;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  nullSavedSource = () => this.closeTabService.saveDataForQotrManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForQotrManager) {
      this.dataSource.data = this.closeTabService.saveDataForQotrManager;
    }
    else {
      this.dataSource.data = await this.getDataSource();
      this.closeTabService.saveDataForQotrManager = this.dataSource.data;
    }
    this.countryDictionary = await this.getProvinceDictionary();

    this.convertIdToTitle(this.dataSource.data, this.countryDictionary);
    this.filterSearchs();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/qr')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.provinceId.toString().toLowerCase().indexOf(searchTerms.provinceId) !== -1
        && data.province.toLowerCase().indexOf(searchTerms.province) !== -1
    }
    return filterFunction;
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe())
  }
}