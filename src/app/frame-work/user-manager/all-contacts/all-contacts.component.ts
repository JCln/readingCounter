import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { InteractionService } from 'src/app/services/interaction.service';

import { CheckboxRenderer } from '../../checkbox-renderer.componenet';
import { IUserManager } from './../../../Interfaces/iuser-manager';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit, AfterViewInit, OnDestroy {
  frameworkComponents: any;
  rowDataClicked1 = {};
  subscription: Subscription[] = [];

  columnDefs = [
    // { field: 'id', sortable: true, filter: true },
    { field: 'userCode', headerName: 'کد', sortable: true, filter: true, cellClass: 'cell_conf' },
    { field: 'username', headerName: 'نام کاربری', sortable: true, filter: true, cellClass: 'cell_conf' },
    { field: 'mobile', headerName: 'موبایل', sortable: true, filter: true, cellClass: 'cell_conf  dir_ltr' },
    { field: 'displayName', headerName: 'نام نمایشی', sortable: true, filter: true, cellClass: 'cell_conf' },
    { field: 'isActive', headerName: 'فعال', sortable: true, filter: true, cellClass: 'cell_conf', cellRenderer: 'checkboxRenderer' },
    { field: 'isLocked', headerName: 'قفل', sortable: true, filter: true, cellClass: 'cell_conf', cellRenderer: 'checkboxRenderer' },
    {
      field: 'ویرایش',
      cellRenderer: 'BtnCellRendererComponent',
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this)
      },
      minWidth: 85,
    }

  ];
  rowData: any;

  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute,
    private interactionService: InteractionService,
    private router: Router
  ) {
  }

  onBtnClick1(e) {
    this.rowDataClicked1 = e.rowData;
    console.log(e.rowData.id);

    this.router.navigate(['../edit', e.rowData.id], { relativeTo: this.route.parent })
  }
  getDataSource = (): Promise<IUserManager> => {
    return new Promise((resolve) => {
      this.httpClient.get('https://37.191.92.157/kontoriNew/v1/user/all').subscribe((res: any) => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  nullSavedSource = () => this.interactionService.saveDataForAllContacts = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.interactionService.saveDataForAllContacts) {
      this.rowData = this.interactionService.saveDataForAllContacts;
    }
    else {
      this.rowData = await this.getDataSource();
      this.interactionService.saveDataForAllContacts = this.rowData;
    }

  }
  ngOnInit(): void {
    this.frameworkComponents = {
      BtnCellRendererComponent: BtnCellRendererComponent,
      checkboxRenderer: CheckboxRenderer
    }
    this.classWrapper();
  }
  // closeTabStatus = () => {
  //   this.subscription.push(this.interactionService.getClosedPage().subscribe((res: string) => {
  //     if (res) {
  //       if (res === '/wr/mu/all') {
  //         this.nullSavedSource();
  //       }
  //     }
  //   })
  //   )
  // }
  // refreshTabStatus = () => {
  //   this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
  //     if (res) {
  //       if (res === '/wr/mu/all')
  //         this.classWrapper(true);
  //     }
  //   })
  //   )
  // }
  ngAfterViewInit(): void {
    // this.closeTabStatus();
    // this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  
}
