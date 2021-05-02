import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { IOnOffLoad, IOverAllWOUIInfo } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { DownloadManagerService } from 'src/app/services/download-manager.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@Component({
  selector: 'app-woui',
  templateUrl: './woui.component.html',
  styleUrls: ['./woui.component.scss']
})
export class WouiComponent implements OnInit, AfterViewInit, OnDestroy {
  targetFile = {
    id: '',
    isForbidden: false
  }

  dataSource: IOnOffLoad[] = [];
  audioFiles: IOnOffLoad[] = [];
  imageFiles: IOnOffLoad[] = [];
  overAllInfo: IOverAllWOUIInfo;
  interationOnOverallInfo: any[] = [];

  testLoadImage: any[] = [];
  testAudio = new Audio();
  showAudioControllers: boolean = false;
  isPlaying: boolean = false;
  downloadURL: string = '';
  viewerOpen: boolean[] = [false];
  ref: DynamicDialogRef;

  subscription: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private downloadManagerService: DownloadManagerService,
    private closeTabService: CloseTabService,
    private interactionService: InteractionService,
    private dialogService: DialogService,
    private _location: Location
    // private domSanitizer: DomSanitizer
  ) { }

  private getRouteParams = () => {
    this.targetFile.id = this.route.snapshot.paramMap.get('UUID');
    const checkBoolean = this.route.snapshot.paramMap.get('isForbidden');
    this.targetFile.isForbidden = checkBoolean ? checkBoolean.toLocaleLowerCase() === 'true' : false;
  }
  private useAPI = (): Promise<any> => {
    return new Promise((resolve) => {
      this.targetFile.isForbidden ?
        resolve(this.downloadManagerService.downloadForbiddenFileInfo(this.targetFile.id)) :
        resolve(this.downloadManagerService.downloadFileInfo(this.targetFile.id));
    });
  }
  getDownloadListInfo = () => {
    this.interationOnOverallInfo = this.downloadManagerService.getDownloadListInfo();
  }
  nullSavedSource = () => this.closeTabService.saveDataForWOUI = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.useAPI();
    this.downloadManagerService.assignToDataSource(this.dataSource);
    this.audioFiles = this.downloadManagerService.separateAudioFiles();
    this.imageFiles = this.downloadManagerService.separateImageFiles();
    this.overAllInfo = this.downloadManagerService.getOverAllInfo();
    this.getDownloadListInfo();
  }
  ngOnInit(): void {
    this.getRouteParams();
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/m/track/woui'))
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
  getExactImg = async (id: string, index: number) => {
    if (this.testLoadImage[index])
      return;
    const res = await this.downloadManagerService.downloadFile(id)
    // .pipe(map(
    //   e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))
    // ))
    this.testLoadImage[index] = res;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.testLoadImage[index] = reader.result;
    }, false);
    if (this.testLoadImage[index]) {
      reader.readAsDataURL(this.testLoadImage[index]);
    }
  }
  getExactAudio = (id: string) => {
    const res = this.downloadManagerService.downloadFile(id)
    this.downloadURL = window.URL.createObjectURL(res);
    this.testAudio.src = this.downloadURL;
    this.isShowAudioControllers();
  }
  playAudio = () => {
    this.testAudio.play();
  }
  pauseAudio = () => {
    this.testAudio.pause();
  }
  rePlayAudio = () => {
    this.testAudio.load();
    this.testAudio.play();
  }
  isShowAudioControllers = () => {
    this.showAudioControllers = true;
  }
  downloadAudio = () => {
    const link = document.createElement('a');
    link.href = this.downloadURL;
    link.download = `${new Date().toLocaleDateString()}.ogg`;
    link.click();
  }
  showBigImage = (data: any) => {
    this.ref = this.dialogService.open(ImageViewerComponent, {
      data: data,
      rtl: true,
      width: '80%',
      height: '100%',
      closable: true
    })
  }
  toPrePage = () => this._location.back();
}