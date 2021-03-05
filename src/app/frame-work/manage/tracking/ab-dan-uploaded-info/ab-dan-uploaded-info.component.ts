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
  selector: 'app-ab-dan-uploaded-info',
  templateUrl: './ab-dan-uploaded-info.component.html',
  styleUrls: ['./ab-dan-uploaded-info.component.scss']
})
export class AbDanUploadedInfoComponent implements OnInit, AfterViewInit, OnDestroy {
  private onOffLoadId: string = '';

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
    private dialogService: DialogService
    // private domSanitizer: DomSanitizer
  ) { }

  private getRouteParams = () => {
    this.onOffLoadId = this.route.snapshot.paramMap.get('id');
  }
  private getOnOffLoadData = (): Promise<IOnOffLoad[]> => {
    try {
      return new Promise((resolve) => {
        this.downloadManagerService.downloadFileInfo(this.onOffLoadId).subscribe(res =>
          resolve(res)
        );
      });
    } catch (error) {
      console.error(error);
    }
  }
  getDownloadListInfo = () => {
    this.interationOnOverallInfo = this.downloadManagerService.getDownloadListInfo();
  }
  nullSavedSource = () => this.closeTabService.saveDataForWOUI = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.getOnOffLoadData();
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
        if (res.includes('/wr/m/track/woui/'))
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
  getExactImg = (id: string, index: number) => {
    if (this.testLoadImage[index])
      return;
    this.downloadManagerService.downloadFile(id)
      // .pipe(map(
      //   e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))
      // ))
      .subscribe(res => {
        if (res) {
          this.testLoadImage[index] = res;
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            this.testLoadImage[index] = reader.result;
          }, false);
          if (this.testLoadImage[index]) {
            reader.readAsDataURL(this.testLoadImage[index]);
          }
        }
      })
  }
  getExactAudio = (id: string) => {
    this.downloadManagerService.downloadFile(id).subscribe(res => {
      if (res) {
        this.downloadURL = window.URL.createObjectURL(res);
        this.testAudio.src = this.downloadURL;
        this.isShowAudioControllers();
      }

    })
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

}