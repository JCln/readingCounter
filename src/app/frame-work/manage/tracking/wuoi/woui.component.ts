import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOnOffLoad, IOverAllWOUIInfo } from 'interfaces/itrackings';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Galleria } from 'primeng/galleria';
import { filter } from 'rxjs/internal/operators/filter';
import { CloseTabService } from 'services/close-tab.service';
import { DownloadManagerService } from 'services/download-manager.service';
import { EnvService } from 'services/env.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';
import { ImageViewerComponent } from 'src/app/shared/carousel-woum/woum/image-viewer/image-viewer.component';

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

  testAudio = new Audio();
  activeIndex: number = 0;
  showAudioControllers: boolean = false;
  isPlaying: boolean = false;
  downloadURL: string = '';
  viewerOpen: boolean[] = [false];
  ref: DynamicDialogRef;
  private tempCarousels: string[] = [];
  testCarouselImages: string[] = [];
  showThumbnails: boolean;
  fullscreen: boolean = false;
  onFullScreenListener: any;
  degree: number = 0;
  @ViewChild('galleria') galleria: Galleria;

  constructor(
    private route: ActivatedRoute,
    private downloadManagerService: DownloadManagerService,
    private closeTabService: CloseTabService,
    private dialogService: DialogService,
    private router: Router,
    public profileService: ProfileService,
    private envService: EnvService
  ) {
    super();
    this.getRouteParams();
  }

  private setToDefault = () => {
    this.audioFiles = [];
    this.imageFiles = [];
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
        resolve(this.downloadManagerService.downloadFileInfo(ENInterfaces.downloadFileForbidden, this.targetFile.id)) :
        resolve(this.downloadManagerService.downloadFileInfo(ENInterfaces.downloadFileInfo, this.targetFile.id));
    });
  }
  getDownloadListInfo = () => {
    this.interationOnOverallInfo = this.downloadManagerService.getDownloadListInfo();
  }
  nullSavedSource = () => this.closeTabService.saveDataForWOUI = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.setToDefault();
    }
    this.dataSource = await this.useAPI();
    this.downloadManagerService.assignToDataSource(this.dataSource);

    this.audioFiles = this.downloadManagerService.separateAudioFiles();
    this.imageFiles = this.downloadManagerService.separateImageFiles();

    this.overAllInfo = this.downloadManagerService.getOverAllInfo();
    console.log(this.profileService.getUseCarouselMedia());
    this.getDownloadListInfo();
    this.showAllImgs();
  }
  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }
  callApiImgs = async (id: string, index: number) => {
    this.tempCarousels[index] = this.envService.API_URL + '/' + ENInterfaces.downloadFileByUrl + '/' + id + '?access_token=' + this.profileService.getToken();
  }
  showAllImgs = () => {
    this.imageFiles.forEach((item, i) => {
      this.callApiImgs(item.fileRepositoryId, i);
    })
    this.testCarouselImages = this.tempCarousels;

    this.bindDocumentListeners();
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
  ngOnInit(): void { return; }
  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
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
  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    }
    else {
      this.openPreviewFullScreen();
    }
  }
  downloadImg = (src: any) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${new Date().toLocaleDateString()}.jpg`;
    link.click();
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
}