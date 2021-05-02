import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IUserManager } from 'src/app/Interfaces/iuser-manager';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { UsersAllService } from 'src/app/services/users-all.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.scss']
})
export class UsersAllComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: IUserManager[] = [];
  _selectedColumns: any[];

  constructor(
    private route: ActivatedRoute,
    private interactionService: InteractionService,
    private router: Router,
    private closeTabService: CloseTabService,
    private usersAllService: UsersAllService,
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
        this.usersAllService.connectToServer().subscribe(res => {
          if (res) {
            resolve(res);
          }
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  nullSavedSource = () => this.closeTabService.saveDataForAllUsers = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.utilsService.isNull(this.closeTabService.saveDataForAllUsers)) {
      this.dataSource = await this.getDataSource();
      this.closeTabService.saveDataForAllUsers = this.dataSource;
    }
    else {
      this.dataSource = this.closeTabService.saveDataForAllUsers;
    }
    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectedColumns = this.usersAllService.columnSelectedUserAllUsers();
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
    this.usersAllService.Activate(dataSource.id);
    this.refetchTable(rowIndex);
  }
  DeActivateUser = (dataSource: IUserManager, rowIndex: number) => {
    this.usersAllService.DeActivate(dataSource.id);
    this.refetchTable(rowIndex);
  }
  resetPasswordUser = (dataSource: IUserManager, rowIndex: number) => {
    this.usersAllService.resetPassword(dataSource.id);
    this.refetchTable(rowIndex);
  }
  showExactConfig = (index: number) => {
    let a = document.querySelectorAll('.more_configs');
    a[index].classList.toggle('showConfigs');
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
}