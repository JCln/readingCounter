import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IOnOffLoad, IOverAllWOUIInfo } from 'interfaces/imanage';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { DownloadManagerService } from 'services/download-manager.service';
import { InteractionService } from 'services/interaction.service';
import { FactoryONE } from 'src/app/classes/factory';

import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@Component({
  selector: 'app-woui',
  templateUrl: './woui.component.html',
  styleUrls: ['./woui.component.scss']
})
export class WouiComponent extends FactoryONE {
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
    public interactionService: InteractionService,
    private dialogService: DialogService,
    private _location: Location,
    private router: Router
    // private domSanitizer: DomSanitizer
  ) {
    super(interactionService);
    this.getRouteParams();
  }

  private setToDefault = () => {
    this.audioFiles = [];
    this.imageFiles = [];
    this.testLoadImage = [];
  }
  private getRouteParams = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(res => {
        if (res) {
          this.setToDefault();
          this.targetFile.id = this.route.snapshot.paramMap.get('UUID');
          const checkBoolean = this.route.snapshot.paramMap.get('isForbidden');
          this.targetFile.isForbidden = checkBoolean ? checkBoolean.toLocaleLowerCase() === 'true' : false;
          this.classWrapper();
        }
      })
    )

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
  getExactAudio = async (id: string) => {
    const res = await this.downloadManagerService.downloadFile(id);

    this.downloadURL = window.URL.createObjectURL(res);
    this.testAudio.src = this.downloadURL;
    this.isShowAudioControllers();
  } 
  playAudio = () => {
    this.testAudio.play();
    this.testAudio.addEventListener('ended', (event) => {
      this.isPlaying = false;
    });
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