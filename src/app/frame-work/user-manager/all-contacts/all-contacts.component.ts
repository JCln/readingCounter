import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { IUserManager } from './../../../Interfaces/iuser-manager';
import { AllContactsService } from './../../../services/all-contacts.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: IUserManager[] = [];
  _firstPage: number = 0;
  _rowsNumberPage: number = 10;

  constructor(
    private route: ActivatedRoute,
    private interactionService: InteractionService,
    private router: Router,
    private closeTabService: CloseTabService,
    private allContactsService: AllContactsService
  ) {
  }

  routeToEditPage(e) {
    this.router.navigate(['../edit', e], { relativeTo: this.route.parent })
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
    if (this.closeTabService.saveDataForAllContacts) {
      this.dataSource = this.closeTabService.saveDataForAllContacts;
    }
    else {
      this.dataSource = await this.getDataSource();
      console.log(this.dataSource);

      this.closeTabService.saveDataForAllContacts = this.dataSource;
    }
  }
  next = () => this._firstPage = this._firstPage + this._rowsNumberPage;
  prev = () => this._firstPage = this._firstPage - this._rowsNumberPage;
  reset = () => this._firstPage = 0;
  isLastPage = (): boolean => { return this.dataSource ? this._firstPage === (this.dataSource.length - this._rowsNumberPage) : true; }
  isFirstPage = (): boolean => { return this.dataSource ? this._firstPage === 0 : true; }
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

}
