import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';

import { IUserManager } from './../../../Interfaces/iuser-manager';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';
import { CheckboxRenderer } from './checkbox-renderer.componenet';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit, AfterViewInit {
  frameworkComponents: any;
  rowDataClicked1 = {};

  columnDefs = [
    // { field: 'id', sortable: true, filter: true },
    { field: 'userCode', headerName: 'کد', sortable: true, filter: true, cellClass: 'cell_conf' },
    { field: 'username', headerName: 'نام کاربری', sortable: true, filter: true, cellClass: 'cell_conf' },
    { field: 'mobile', headerName: 'موبایل', sortable: true, filter: true, cellClass: 'cell_conf  dir_ltr' },
    { field: 'displayName', headerName: 'نام نمایشی', sortable: true, filter: true, cellClass: 'cell_conf' },
    { field: 'isActive', headerName: 'فعال', sortable: true, filter: true, cellClass: 'cell_conf',cellRenderer: 'checkboxRenderer' },
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
      // this.interfaceManagerService.getAllUserContactsManager().subscribe(res => {
      this.httpClient.get('http://37.191.92.130/kontoriNew/v1/user/all').subscribe((res: any) => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  classWrapper = async () => {
    const a = await this.getDataSource();
    this.rowData = a;
  }

  ngOnInit(): void {
    this.frameworkComponents = {
      BtnCellRendererComponent: BtnCellRendererComponent,
      checkboxRenderer: CheckboxRenderer
    }
    this.classWrapper();
  }
  ngAfterViewInit(): void {
    this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res && res.length !== 0) {
        if (res === this.router.url)
          this.ngOnInit();
      }
    })
  }

}
