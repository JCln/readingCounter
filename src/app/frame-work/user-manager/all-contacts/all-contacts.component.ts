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
    return new Promise((resolve) => {
      this.allContactsService.connectToServer().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
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
}
