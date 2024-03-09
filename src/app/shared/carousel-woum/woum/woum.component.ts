import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Galleria } from 'primeng/galleria';
import { DownloadManagerService } from 'services/download-manager.service';
import { ProfileService } from 'services/profile.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { IOverAllWOUIInfo } from 'interfaces/itrackings';

import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MathS } from 'src/app/classes/math-s';
import { UtilsService } from 'services/utils.service';
import { ENImageTypes, ENRandomNumbers } from 'interfaces/enums.enum';
@Component({
  selector: 'app-woum',
  templateUrl: './woum.component.html',
  styleUrls: ['./woum.component.scss']
})
export class WoumComponent implements OnChanges {
  ENImageTypes = ENImageTypes;
  ref: DynamicDialogRef;

  @Input() zoneId?: any;
  @Input() preDate?: string;
  @Input() description?: string;
  @Input() preNumber?: number;
  @Input() id: string;
  @Input() fileRepositoryId: string;
  @Input() counterStateCode?: string;
  @Input() counterNumber?: string;
  @Input() eshterak?: string;
  @Input() counterStateId?: string;
  @Input() firstName?: string;
  @Input() sureName?: string;
  @Input() radif: number;
  @Input() _insertDayJalali: string;
  @Input() _feedbackTypeTitle: string;
  @Input() _mobile: string;
  @Input() _solution: string;
  @Input() _type: ENImageTypes;
  @Input() _reportTitle: string;
  // from trv & details , ..
  @Input() fulName?: string;
  // from forbidden
  @Input() displayName?: string;
  @Input() _audioExtention?: string; // getUploaded content type
  @Input() userDisplayName?: string; // getUploaded content type
  @Input() sizeInByte?: string; // getUploaded content type


  offloadModifyReq: IOffloadModifyReq = {
    id: '',
    modifyType: null,
    checkedItems: [],
    counterStateId: null,
    counterNumber: null,
    jalaliDay: '',
    description: ''
  }
  dataSource: any[] = [];
  testAudio = new Audio();
  audioFiles: any[] = [];
  downloadURL: string = '';
  showAudioControllers: boolean = false;
  // isPlaying: boolean = false;  
  overAllInfo: IOverAllWOUIInfo;
  interationOnOverallInfo: any[] = [];

  imageFiles: any[] = [];
  testSingleImage: string = '';

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
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    public profileService: ProfileService
  ) { }


  showSingleAudio = () => {
    this.audioFiles.push(this.dataSource);
    this.getExactAudio(this.fileRepositoryId);
  }
  showSingleImage = () => {
    this.testSingleImage = this.utilsService.getAPIUrl() + '/' + ENInterfaces.downloadFileByUrl + '/' + this.fileRepositoryId + ENInterfaces.accessTokenTile + this.utilsService.compositeService.getAccessToken();
  }
  receiveFromDateJalali = ($event: string) => {
    this.offloadModifyReq.jalaliDay = $event;
  }
  callApiImgs = async (id: string, index: number) => {
    this.tempCarousels[index] = this.utilsService.getAPIUrl() + '/' + ENInterfaces.downloadFileByUrl + '/' + id + ENInterfaces.accessTokenTile + this.utilsService.compositeService.getAccessToken();
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
    if (this._type !== ENImageTypes.single)
      this.interationOnOverallInfo = this.downloadManagerService.getDownloadListInfo();
  }
  /* AUDIO */
  canShowAudioControllers = () => {
    this.showAudioControllers = true;
  }
  getExactAudio = async (id: string) => {
    const res = await this.downloadManagerService.ajaxReqWrapperService.getBlobById(ENInterfaces.downloadFileGET, id);
    this.downloadURL = window.URL.createObjectURL(res);
    this.testAudio.src = this.downloadURL;
    this.canShowAudioControllers();
  }
  downloadAudio = () => {
    const link = document.createElement('a');
    link.href = this.downloadURL;
    link.download = `${new Date().toLocaleDateString()}.ogg`;
    link.click();
  }
  // playAudio = () => {
  //   this.testAudio.play();
  //   this.testAudio.addEventListener('ended', () => {
  //     this.isPlaying = false;
  //   });
  // }
  // pauseAudio = () => this.testAudio.pause();
  // rePlayAudio = () => {
  //   this.testAudio.load();
  //   this.testAudio.play();
  // }
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
  connectToServer = async () => {
    this.checkItems();
    this.assignToObject();
    const verificationCheck = this.trackingManagerService.verificationOffloadModify(this.offloadModifyReq);
    if (verificationCheck) {
      const res = await this.trackingManagerService.postOffloadModifyEdited(ENInterfaces.trackingPostOffloadModify, this.offloadModifyReq);
      this.trackingManagerService.successSnackMessage(res.message);
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    console.log(this._type);
    this.imageFiles = [];
    this.audioFiles = [];
    this.dataSource = [];

    // typical
    console.log(this._type);

    if (this._type == ENImageTypes.typical) {
      this.dataSource = await this.downloadManagerService.downloadFileInfo(ENInterfaces.downloadFileInfo, this.id);
    }
    // forbidden
    if (this._type == ENImageTypes.forbidden) {
      this.dataSource = await this.downloadManagerService.downloadFileInfo(ENInterfaces.downloadFileForbidden, this.id);
    }
    // mobileApp
    if (this._type == ENImageTypes.mobileApp) {
      this.dataSource = await this.downloadManagerService.downloadFileInfo(ENInterfaces.feedbackMobileDictionary, this.id);
    }
    // single image, by fileRepositoryId
    if (this._type == ENImageTypes.single) {
      const audioValidExtention = ['.ogg'];
      audioValidExtention.indexOf(this._audioExtention) == -1 ? this.showSingleImage() : this.showSingleAudio();
      return;
    }

    if (this.zoneId) {
      this.counterStatesDictionary = await this.trackingManagerService.dictionaryWrapperService.getCounterStateByCodeDictionary(parseInt(this.zoneId));
    }

    if (!MathS.isNaN(this.zoneId)) {
      this.zoneDictionary = await this.dictionaryWrapperService.getZoneDictionary();
      this.zoneDictionary.find(dictionary => {
        if (dictionary.id == this.zoneId) {
          return this.zoneId = dictionary.title
        }
      });
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
