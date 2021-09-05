import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IOnOffLoad } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { DownloadManagerService } from 'services/download-manager.service';
import { InteractionService } from 'services/interaction.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { OffloadModify } from 'src/app/classes/offload-modify-type';

import { ImageViewerComponent } from '../../wuoi/image-viewer/image-viewer.component';

@Component({
  selector: 'app-offload',
  templateUrl: './offload.component.html',
  styleUrls: ['./offload.component.scss']
})
export class OffloadComponent extends FactoryONE {
  offloadModifyReq: IOffloadModifyReq = {
    id: '',
    modifyType: null,
    checkedItems: [],
    counterStateId: 0,
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

  imageFiles: IOnOffLoad[] = [];
  testLoadImage: any[] = [];

  subscription: Subscription[] = [];

  zoneId: string = null;
  modifyType: OffloadModify[];
  offloadItems: OffloadModify[];

  counterStatesDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  ref: DynamicDialogRef;

  constructor(
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private trackingManagerService: TrackingManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private downloadManagerService: DownloadManagerService,
    private dialogService: DialogService
  ) {
    super(interactionService);
    this.getRouteParams();
  }

  nullSavedSource = () => this.closeTabService.saveDataForOffloadModify = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForOffloadModify) {
      this.dataSource = this.closeTabService.saveDataForOffloadModify;
    }
    else {
      this.dataSource = await this.downloadManagerService.downloadFileInfo(this.offloadModifyReq.id);
      this.closeTabService.saveDataForOffloadModify = this.dataSource;
    }

    this.counterStatesDictionary = await this.trackingManagerService.getCounterStatesDictionary(parseInt(this.zoneId));
    this.downloadManagerService.assignToDataSource(this.dataSource);
    this.audioFiles = this.downloadManagerService.separateAudioFiles();
    this.imageFiles = this.downloadManagerService.separateImageFiles();
    this.modifyType = this.trackingManagerService.getOffloadModifyType();
    this.offloadItems = this.trackingManagerService.getOffloadItems();

    this.imageFiles.forEach((item, i) => {
      this.getExactImg(item.fileRepositoryId, i);
    })

  }
  receiveFromDateJalali = ($event: string) => {
    this.offloadModifyReq.jalaliDay = $event;
  }
  checkItems = () => {
    const offloadItems = this.trackingManagerService.selectedItems(this.offloadItems);
    this.offloadModifyReq.checkedItems = offloadItems;
  }
  verification = () => {
    this.checkItems();
    const verificationCheck = this.trackingManagerService.verificationOffloadModify(this.offloadModifyReq);
    if (verificationCheck) {
      this.trackingManagerService.postOffloadModifyEdited(this.offloadModifyReq);
    }
  }
  private getRouteParams = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const dynamicRoute = this.route.snapshot.paramMap.get('UUID');
        this.zoneId = dynamicRoute.substring(0, dynamicRoute.indexOf('-'));
        this.offloadModifyReq.id = dynamicRoute.substring(dynamicRoute.indexOf('-') + 1, dynamicRoute.length);
        
        this.classWrapper();
      })
    )
  }
  getExactImg = async (id: string, index: number) => {
    if (this.testLoadImage[index])
      return;
    const res = await this.downloadManagerService.downloadFile(id);

    this.testLoadImage[index] = res;
    console.log(this.testLoadImage);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.testLoadImage[index] = reader.result;
    }, false);
    if (this.testLoadImage[index]) {
      reader.readAsDataURL(this.testLoadImage[index]);
    }
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
  toPrePage = () => {
    this.trackingManagerService.backToPreviousPage();
  }
}
