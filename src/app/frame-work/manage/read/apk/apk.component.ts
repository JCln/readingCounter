import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApkService } from 'services/apk.service';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { IAPK } from 'src/app/Interfaces/inon-manage';

@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html',
  styleUrls: ['./apk.component.scss']
})
export class ApkComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("screenshotInput") screenshotInput: ElementRef | null = null;
  choosenFileName: string = '';
  fileNameAfterChoose: string = '';

  uploadForm: any = {
    versionCode: null,
    versionName: '',
    description: '',
    file: File
  }

  dataSource: IAPK[] = [];
  _columns: any[] = [];
  subscription: Subscription[] = [];

  constructor(
    private apkService: ApkService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private outputManagerService: OutputManagerService
  ) { }

  downloadAPK = async () => {
    const a = await this.apkService.getlastAPK();
    console.log(a);
    this.outputManagerService.downloadFile(a, '.apk');
  }
  onChange(event) {
    const a = document.getElementById('files') as any;
    this.choosenFileName = a.files.item(0).name;
    FileList = event.target.files;
  }
  uploadFile = async (form: NgForm) => {
    if (!this.screenshotInput) {
      throw new Error("this.screenshotInput is null.");
    }

    const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
    if (!fileInput.files) {
      return;
    }

    if (!this.apkService.checkVertitication(fileInput.files, form.value))
      return;

    await this.apkService.postTicket()
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh)
      this.closeTabService.saveDataForAPKManager = '';

    if (this.closeTabService.saveDataForAPKManager)
      this.dataSource = this.closeTabService.saveDataForAPKManager;
    else
      this.dataSource = await this.apkService.getDataSource();

    this._columns = this.apkService.columnAPK();
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