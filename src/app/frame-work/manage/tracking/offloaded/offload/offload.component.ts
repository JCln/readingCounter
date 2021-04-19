import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { IOnOffLoad } from 'src/app/Interfaces/imanage';
import { IOffloadModifyReq } from 'src/app/Interfaces/inon-manage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { DownloadManagerService } from 'src/app/services/download-manager.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { InterfaceService } from 'src/app/services/interface.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

@Component({
  selector: 'app-offload',
  templateUrl: './offload.component.html',
  styleUrls: ['./offload.component.scss']
})
export class OffloadComponent implements OnInit {
  offloadModifyReq: IOffloadModifyReq = {
    id: '',
    modifyType: 0,
    checkedItems: [],
    counterStateId: 0,
    counterNumber: 0,
    jalaliDay: '',
    description: ''
  }
  dataSource: IOnOffLoad[] = [];

  carouselOptions;
  audioFiles: IOnOffLoad[] = [];
  imageFiles: IOnOffLoad[] = [];
  testLoadImage: any[] = [];

  subscription: Subscription[] = [];

  zoneId: number = null;
  modifyType: OffloadModify[];
  lowQualityPic: OffloadModify[];
  highQualityPic: OffloadModify[];

  counterStatesDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    private interfaceService: InterfaceService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private trackingManagerService: TrackingManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private downloadManagerService: DownloadManagerService
  ) {
    this.getRouteParams();
  }

  getCounterStateByZoneId = async () => {
    this.counterStatesDictionary = await this.trackingManagerService.getCounterStatesDictionary(this.zoneId);
  }
  connectToServer = () => {
  }
  nullSavedSource = () => this.closeTabService.saveDataForOffloadModify = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.downloadManagerService.downloadFileInfo(this.offloadModifyReq.id);
    // console.log(this.dataSource);

    this.zoneDictionary = await this.trackingManagerService.getZoneDictionary();
    this.downloadManagerService.assignToDataSource(this.dataSource);
    this.audioFiles = this.downloadManagerService.separateAudioFiles();
    this.imageFiles = this.downloadManagerService.separateImageFiles();
    this.modifyType = this.trackingManagerService.getOffloadModifyType();
    this.lowQualityPic = this.trackingManagerService.getOffloadLowQualityPicture();
    this.highQualityPic = this.trackingManagerService.getOffloadHighQualityPicture();

    this.imageFiles.forEach((item, i) => {
      this.getExactImg(item.fileRepositoryId, i);
    })

  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/m/track/offloaded/offloadMdf')) {
          this.classWrapper(true);
        }
      }
    })
    )
  }
  receiveFromDateJalali = ($event: string) => {
    this.offloadModifyReq.jalaliDay = $event;
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  verification = () => {
    const lowQ = this.trackingManagerService.selectedItems(this.lowQualityPic);
    const highQ = this.trackingManagerService.selectedItems(this.highQualityPic);

    this.offloadModifyReq.checkedItems.push(...lowQ);
    this.offloadModifyReq.checkedItems.push(...highQ);

    this.resetToDefaultFormStatus();
  }
  private getRouteParams = () => {
    this.subscription.push(this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res) {
          this.offloadModifyReq.id = this.route.snapshot.paramMap.get('UUID');
        }
      }
    })
    )
  }
  private resetToDefaultFormStatus = () => {
    this.offloadModifyReq.checkedItems = [];
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
          console.log(res);

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
    // this.downloadManagerService.downloadFile(id).subscribe(res => {
    //   if (res) {
    //     this.downloadURL = window.URL.createObjectURL(res);
    //     this.testAudio.src = this.downloadURL;
    //     this.isShowAudioControllers();
    //   }

    // })
  }

}
