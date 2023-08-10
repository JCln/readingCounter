import { EN_messages } from 'interfaces/enums.enum';
import { Component, Input, OnChanges } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IOnOffLoad } from 'interfaces/itrackings';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DownloadManagerService } from 'services/download-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { ImageViewerComponent } from 'src/app/shared/carousel-woum/woum/image-viewer/image-viewer.component';

@Component({
  selector: 'app-offload',
  templateUrl: './offload.component.html',
  styleUrls: ['./offload.component.scss']
})
export class OffloadComponent implements OnChanges {

  @Input() zoneId: string = null;
  @Input() onOffloadId: string;
  @Input() preDate: string;
  @Input() description: string;
  @Input() preNumber: number;
  @Input() id: string;
  @Input() counterStateId: any;
  @Input() counterNumber: string;
  @Input() firstName: string;
  @Input() sureName: string;
  @Input() radif: number;

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

  testAudio = new Audio();
  audioFiles: IOnOffLoad[] = [];
  downloadURL: string = '';
  showAudioControllers: boolean = false;
  isPlaying: boolean = false;
  ref: DynamicDialogRef;

  imageFiles: IOnOffLoad[] = [];
  tempLoadedImgs: any[] = [];
  originImages: string[] = [];

  modifyType: OffloadModify[];
  offloadItems: OffloadModify[];

  counterStatesDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    private downloadManagerService: DownloadManagerService,
    private trackingManagerService: TrackingManagerService,
    private dialogService: DialogService
  ) { }

  classWrapper = async (canRefresh?: boolean) => {
    this.imageFiles = [];
    this.audioFiles = [];
    this.dataSource = [];
    this.tempLoadedImgs = [];

    if (!this.onOffloadId)
      return;

    this.dataSource = await this.downloadManagerService.downloadFileInfo(ENInterfaces.downloadFileInfo, this.onOffloadId);
    if (this.zoneId) {
      this.counterStatesDictionary = await this.trackingManagerService.dictionaryWrapperService.getCounterStateByZoneIdDictionary(parseInt(this.zoneId));
    }

    this.downloadManagerService.assignToDataSource(this.dataSource);
    this.audioFiles = this.downloadManagerService.separateAudioFiles();
    this.imageFiles = this.downloadManagerService.separateImageFiles();
    this.modifyType = this.trackingManagerService.getOffloadModifyType();
    this.offloadItems = this.trackingManagerService.getOffloadItems();

    this.imageFiles.forEach((item, i) => {
      this.getExactImg(item.fileRepositoryId, i);
    })
    this.originImages = this.tempLoadedImgs;
  }
  ngOnChanges(): void {
    this.classWrapper();
  }
  receiveFromDateJalali = ($event: string) => {
    this.offloadModifyReq.jalaliDay = $event;
  }
  getExactImg = async (id: string, index: number) => {
    this.tempLoadedImgs[index] = this.trackingManagerService.getApiUrl() + '/' + ENInterfaces.downloadFileByUrl + '/' + id + '?access_token=' + this.trackingManagerService.getAuthToken();
  }

  /* AUDIO */
  isShowAudioControllers = () => {
    this.showAudioControllers = true;
  }
  getExactAudio = async (id: string) => {
    const res = await this.downloadManagerService.ajaxReqWrapperService.getBlobById(ENInterfaces.downloadFileGET, id);
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
  assignToCounterState = (): boolean => {
    if (this.counterStateId) {
      const temp = this.convertTitleToId(this.counterStateId);
      this.offloadModifyReq.counterStateId = temp.id;
      return true;
    }
    else {
      this.trackingManagerService.showWarnMessage(EN_messages.insert_counterState);
      return false;
    }
  }
  assignToObject = () => {
    this.offloadModifyReq.id = this.id;
  }
  convertTitleToId = (dataSource: any): any => {
    if (this.counterStatesDictionary) {
      return this.counterStatesDictionary.find(item => {
        if (item.title === dataSource)
          return item;
      })
    }
  }
  connectToServer = async () => {
    this.checkItems();
    this.assignToObject();
    if (this.assignToCounterState()) {
      const verificationCheck = this.trackingManagerService.verificationOffloadModify(this.offloadModifyReq);
      if (verificationCheck) {
        const res = await this.trackingManagerService.postOffloadModifyEdited(this.offloadModifyReq);
        this.trackingManagerService.successSnackMessage(res.message);
      }
    }
  }
}
