import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { ENRandomNumbers, IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Galleria } from 'primeng/galleria';
import { DownloadManagerService } from 'services/download-manager.service';
import { EnvService } from 'services/env.service';
import { ProfileService } from 'services/profile.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { JwtService } from 'src/app/auth/jwt.service';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { IOnOffLoad, IOverAllWOUIInfo } from 'interfaces/itrackings';

import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@Component({
  selector: 'app-woum',
  templateUrl: './woum.component.html',
  styleUrls: ['./woum.component.scss']
})
export class WoumComponent implements OnChanges {

  @Input() zoneId?: string = null;
  @Input() preDate?: string;
  @Input() description?: string;
  @Input() preNumber?: number;
  @Input() id: string;
  @Input() counterStateCode?: string;
  @Input() counterNumber?: string;
  @Input() eshterak?: string;
  @Input() counterStateId?: string;
  @Input() firstName?: string;
  @Input() sureName?: string;
  @Input() radif: number;
  @Input() _isNotForbidden: boolean;
  // from trv & details , ..
  @Input() fulName?: string;

  offloadModifyReq: IOffloadModifyReq = {
    id: '',
    modifyType: null,
    checkedItems: [],
    counterStateId: null,
    counterNumber: null,
    jalaliDay: '',
    description: ''
  }
  dataSource: IOnOffLoad[] = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  testAudio = new Audio();
  audioFiles: IOnOffLoad[] = [];
  downloadURL: string = '';
  showAudioControllers: boolean = false;
  isPlaying: boolean = false;
  ref: DynamicDialogRef;
  overAllInfo: IOverAllWOUIInfo;
  interationOnOverallInfo: any[] = [];

  imageFiles: IOnOffLoad[] = [];

  modifyType: OffloadModify[];
  offloadItems: OffloadModify[];
  showThumbnails: boolean;
  fullscreen: boolean = false;
  activeIndex: number = 0;
  onFullScreenListener: any;
  degree: number = 0;
  originImages: string[] = [];
  tempCarousels: string[] = [];
  @ViewChild('galleria') galleria: Galleria;

  counterStatesDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    private downloadManagerService: DownloadManagerService,
    private trackingManagerService: TrackingManagerService,
    private dialogService: DialogService,
    private jwtService: JwtService,
    private envService: EnvService,
    public profileService: ProfileService
  ) { }

  classWrapper = async (canRefresh?: boolean) => {
    this.imageFiles = [];
    this.audioFiles = [];
    this.dataSource = [];

    if (!this.id)
      return;

    this.dataSource = this._isNotForbidden ?
      await this.downloadManagerService.downloadFileInfo(ENInterfaces.downloadFileInfo, this.id) :
      await this.downloadManagerService.downloadFileInfo(ENInterfaces.downloadFileForbidden, this.id)

    if (this.zoneId) {
      this.counterStatesDictionary = await this.trackingManagerService.getCounterStateByCodeDictionary(parseInt(this.zoneId));
    }
    this.downloadManagerService.assignToDataSource(this.dataSource);
    this.audioFiles = this.downloadManagerService.separateAudioFiles();
    this.imageFiles = this.downloadManagerService.separateImageFiles();
    this.modifyType = this.trackingManagerService.getOffloadModifyType();
    this.offloadItems = this.trackingManagerService.getOffloadItems();

    this.overAllInfo = this.downloadManagerService.getOverAllInfo();
    this.getDownloadListInfo();
    this.showAllImgs();
  }
  ngOnChanges(): void {
    this.classWrapper();
  }
  receiveFromDateJalali = ($event: string) => {
    this.offloadModifyReq.jalaliDay = $event;
  }
  callApiImgs = async (id: string, index: number) => {
    this.tempCarousels[index] = this.envService.API_URL + '/' + ENInterfaces.downloadFileByUrl + '/' + id + '?access_token=' + this.jwtService.getAuthorizationToken();
  }
  showAllImgs = () => {
    this.imageFiles.forEach((item, i) => {
      this.callApiImgs(item.fileRepositoryId, i);
    })
    this.originImages = this.tempCarousels;

    this.bindDocumentListeners();
    this.canShowBigScreen();
  }
  canShowBigScreen = () => {
    // if image number is one then show on fullScreen
    if (!this.profileService.getUseCarouselMedia() && this.originImages.length === ENRandomNumbers.one) {
      this.showBigImage(this.originImages[0]);
    }
  }
  getDownloadListInfo = () => {
    this.interationOnOverallInfo = this.downloadManagerService.getDownloadListInfo();
  }
  /* AUDIO */
  isShowAudioControllers = () => {
    this.showAudioControllers = true;
  }
  getExactAudio = async (id: string) => {
    const res = await this.downloadManagerService.downloadFile(id)
    this.downloadURL = window.URL.createObjectURL(res);
    this.testAudio.src = this.downloadURL;
    this.isShowAudioControllers();
  }
  downloadAudio = () => {
    const link = document.createElement('a');
    link.href = this.downloadURL;
    link.download = `${new Date().toLocaleDateString()}.ogg`;
    link.click();
  }
  playAudio = () => {
    this.testAudio.play();
    this.testAudio.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }
  pauseAudio = () => this.testAudio.pause();
  rePlayAudio = () => {
    this.testAudio.load();
    this.testAudio.play();
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
  checkItems = () => {
    const offloadItems = this.trackingManagerService.selectedItems(this.offloadItems);
    this.offloadModifyReq.checkedItems = offloadItems;
  }
  assignToObject = () => {
    this.offloadModifyReq.id = this.id;
    const temp = this.convertTitleToId(this.counterStateCode);
    this.offloadModifyReq.counterStateId = temp.id;
  }
  convertTitleToId = (dataSource: any): any => {
    return this.counterStatesDictionary.find(item => {
      if (item.title === dataSource)
        return item;
    })
  }
  connectToServer = () => {
    this.checkItems();
    this.assignToObject();
    const verificationCheck = this.trackingManagerService.verificationOffloadModify(this.offloadModifyReq);
    if (verificationCheck) {
      this.trackingManagerService.postOffloadModifyEdited(this.offloadModifyReq);
    }
  }
  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }
  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    }
    else {
      this.openPreviewFullScreen();
    }
  }
  openPreviewFullScreen() {
    let elem = this.galleria.element.nativeElement.querySelector(".p-galleria");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    else if (elem['mozRequestFullScreen']) { /* Firefox */
      elem['mozRequestFullScreen']();
    }
    else if (elem['webkitRequestFullscreen']) { /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    }
    else if (elem['msRequestFullscreen']) { /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }
  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
  }
  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document['mozCancelFullScreen']) {
      document['mozCancelFullScreen']();
    }
    else if (document['webkitExitFullscreen']) {
      document['webkitExitFullscreen']();
    }
    else if (document['msExitFullscreen']) {
      document['msExitFullscreen']();
    }
  }
  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener("fullscreenchange", this.onFullScreenListener);
    document.addEventListener("mozfullscreenchange", this.onFullScreenListener);
    document.addEventListener("webkitfullscreenchange", this.onFullScreenListener);
    document.addEventListener("msfullscreenchange", this.onFullScreenListener);
  }
  unbindDocumentListeners() {
    document.removeEventListener("fullscreenchange", this.onFullScreenListener);
    document.removeEventListener("mozfullscreenchange", this.onFullScreenListener);
    document.removeEventListener("webkitfullscreenchange", this.onFullScreenListener);
    document.removeEventListener("msfullscreenchange", this.onFullScreenListener);
    this.onFullScreenListener = null;
  }
  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }
  rotateRightImg = () => {
    const a = document.querySelector('.main_img') as HTMLElement;
    this.degree += 90;
    a.style.transform = `rotate(${this.degree + 'deg'}`;
  }
  rotateLeftImg = () => {
    const a = document.querySelector('.main_img') as HTMLElement;
    this.degree -= 90;
    a.style.transform = `rotate(${this.degree + 'deg'}`;
  }
}
