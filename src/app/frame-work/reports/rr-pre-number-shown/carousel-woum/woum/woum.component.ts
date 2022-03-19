import { Component, Input, OnChanges } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DownloadManagerService } from 'services/download-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { ImageViewerComponent } from 'src/app/frame-work/manage/tracking/wuoi/image-viewer/image-viewer.component';
import { IOnOffLoad, IOverAllWOUIInfo } from 'src/app/Interfaces/itrackings';

@Component({
  selector: 'app-woum',
  templateUrl: './woum.component.html',
  styleUrls: ['./woum.component.scss']
})
export class WoumComponent implements OnChanges {

  @Input() zoneId: string;
  @Input() preDate: string;
  @Input() description: string;
  @Input() preNumber: number;
  @Input() id: string;
  @Input() counterStateCode: any;
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
  overAllInfo: IOverAllWOUIInfo;
  interationOnOverallInfo: any[] = [];

  imageFiles: IOnOffLoad[] = [];
  testLoadImage: any[] = [];

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
    this.testLoadImage = [];

    if (!this.id)
      return;
    console.log(this.zoneId);

    this.dataSource = await this.downloadManagerService.downloadFileInfo(ENInterfaces.downloadFileInfo, this.id);

    this.counterStatesDictionary = await this.trackingManagerService.getCounterStateByCodeDictionary(parseInt(this.zoneId));
    this.downloadManagerService.assignToDataSource(this.dataSource);
    this.audioFiles = this.downloadManagerService.separateAudioFiles();
    this.imageFiles = this.downloadManagerService.separateImageFiles();
    this.modifyType = this.trackingManagerService.getOffloadModifyType();
    this.offloadItems = this.trackingManagerService.getOffloadItems();

    this.overAllInfo = this.downloadManagerService.getOverAllInfo();
    this.getDownloadListInfo();

    this.imageFiles.forEach((item, i) => {
      this.getExactImg(item.fileRepositoryId, i);
    })

  }
  ngOnChanges(): void {
    this.classWrapper();
  }
  receiveFromDateJalali = ($event: string) => {
    this.offloadModifyReq.jalaliDay = $event;
  }
  getExactImg = async (id: string, index: number) => {
    if (this.testLoadImage[index])
      return;
    const res = await this.downloadManagerService.downloadFile(id);

    this.testLoadImage[index] = res;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.testLoadImage[index] = reader.result;
    }, false);
    if (this.testLoadImage[index]) {
      reader.readAsDataURL(this.testLoadImage[index]);
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
}
