import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IAPK } from 'src/app/Interfaces/inon-manage';
import { ENSnackBarColors, ENSnackBarTimes } from 'src/app/Interfaces/ioverall-config';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { ApkService } from '../../../../services/apk.service';
import { CloseTabService } from '../../../../services/close-tab.service';

@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html',
  styleUrls: ['./apk.component.scss']
})
export class ApkComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("screenshotInput") screenshotInput: ElementRef | null = null;
  choosenFileName: string = '';

  uploadForm: any = {
    versionCode: null,
    versionName: '',
    description: '',
    file: File
  }
  fileNameAfterChoose: string = '';
  subscription: Subscription[] = [];
  dataSource = new MatTableDataSource<IAPK>();
  displayedColumns: string[] = ['versionName', 'versionCode', 'fileRepositoryId'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private interfaceManagerService: InterfaceManagerService,
    private apkService: ApkService,
    private snackWrapperService: SnackWrapperService
  ) { }

  downloadAPK = (fileRepositoryId: string) => {
    console.log(fileRepositoryId);

    // this.interfaceManagerService.downloadFile(fileRepositoryId).subscribe(res => {
    //   console.log(res);

    // })
  }
  onChange(event) {
    const a = document.getElementById('files') as any;
    this.choosenFileName = a.files.item(0).name;
    FileList = event.target.files;
  }
  uploadFile = (form: NgForm) => {
    if (!this.screenshotInput) {
      throw new Error("this.screenshotInput is null.");
    }

    const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
    if (!fileInput.files) {
      return;
    }

    if (!this.apkService.checkVertitication(fileInput.files, form.value))
      return;

    this.apkService.postTicket().subscribe((res: any) => {
      this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.threeMili, ENSnackBarColors.success);
    });
  }

  paginatorTable = () => {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.closeTabService.saveDataForAPKManager = '';
    if (this.closeTabService.saveDataForAPKManager)
      this.dataSource = this.closeTabService.saveDataForAPKManager;
    else
      this.dataSource = await this.apkService.getDataSource();
    this.paginatorTable();

  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/apk')
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