import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IUserManager } from 'src/app/Interfaces/iuser-manager';
import { AllContactsService } from 'src/app/services/all-contacts.service';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: IUserManager[] = [];
  _selectedColumns: any[];

  constructor(
    private route: ActivatedRoute,
    private interactionService: InteractionService,
    private router: Router,
    private closeTabService: CloseTabService,
    private allContactsService: AllContactsService,
    private utilsService: UtilsService
  ) {
  }

  routeToEditPage(e) {
    this.router.navigate(['../edit', e], { relativeTo: this.route.parent })
  }
  routeToLoggs(e: string) {
    this.router.navigate(['./loggins', e], { relativeTo: this.route.parent })
  }
  getDataSource = (): Promise<IUserManager[]> => {
    try {
      return new Promise((resolve) => {
        this.allContactsService.connectToServer().subscribe(res => {
          if (res) {
            resolve(res);
          }
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  nullSavedSource = () => this.closeTabService.saveDataForAllContacts = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.utilsService.isNull(this.closeTabService.saveDataForAllContacts)) {
      this.dataSource = await this.getDataSource();
      this.closeTabService.saveDataForAllContacts = this.dataSource;
    }
    else {
      this.dataSource = this.closeTabService.saveDataForAllContacts;
    }
    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectedColumns = this.allContactsService.columnSelectedUserAllContacts();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/mu/all')
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
  ActivateUser = (dataSource: IUserManager, rowIndex: number) => {
    this.allContactsService.Activate(dataSource.id);
    this.refetchTable(rowIndex);
  }
  DeActivateUser = (dataSource: IUserManager, rowIndex: number) => {
    this.allContactsService.DeActivate(dataSource.id);
    this.refetchTable(rowIndex);
  }
  resetPasswordUser = (dataSource: IUserManager, rowIndex: number) => {
    this.allContactsService.resetPassword(dataSource.id);
    this.refetchTable(rowIndex);
  }
  showExactConfig = (index: number) => {
    let a = document.querySelectorAll('.more_configs');
    a[index].classList.toggle('showConfigs');
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
}
