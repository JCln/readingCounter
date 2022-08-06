import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IImageUrlAndInfos, IImageUrlInfoWrapper } from 'src/app/interfaces/ireports';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.scss']
})
export class AllImagesComponent extends FactoryONE {

  allImagesDataSource: IImageUrlInfoWrapper;
  imgsOriginUrl: any[] = [];

  carouselImage: IImageUrlAndInfos;
  showCarousel: boolean = false;
  rowIndex: number = 0;

  constructor(
    private closeTabService: CloseTabService,
    public readingReportManagerService: ReadingReportManagerService
  ) {
    super();
  }

  connectToServer = async () => {
    if (!this.readingReportManagerService.verificationFollowUPTrackNumber(this.readingReportManagerService.trackNumberAllImages))
      return;
    this.imgsOriginUrl = [];
    this.allImagesDataSource = null;

    this.allImagesDataSource = await this.readingReportManagerService.getDataSource(ENInterfaces.ListAllImages, this.readingReportManagerService.trackNumberAllImages);
    this.closeTabService.saveDataForRRGalleryRSFirst = this.allImagesDataSource;
    this.closeTabService.saveDataForRRGalleryReq = this.readingReportManagerService.trackNumberAllImages;
    this.showAllImgs();
    this.readingReportManagerService._isCollapsedAllImgs = true;
  }
  classWrapper = async (canRefresh?: boolean) => {
    /* TODO: 
    JUST add to closeTabService.saveDataForRRGalleryReq from other
    components to process images
     */
    if (canRefresh) {
      this.closeTabService.saveDataForRRGallery = null;
      this.closeTabService.saveDataForRRGalleryRSFirst = null;
    }
    if (this.closeTabService.saveDataForRRGallery) {
      this.imgsOriginUrl = this.closeTabService.saveDataForRRGallery;
      this.allImagesDataSource = this.closeTabService.saveDataForRRGalleryRSFirst;
    }
    if (this.closeTabService.saveDataForRRGalleryReq) {
      this.readingReportManagerService.trackNumberAllImages = this.closeTabService.saveDataForRRGalleryReq;
      this.readingReportManagerService._isCollapsedAllImgs = true;
    }

  }
  getExactImg = async (id: string, index: number) => {
    this.imgsOriginUrl[index] = this.readingReportManagerService.getApiUrl() + '/' + ENInterfaces.downloadFileByUrl + '/' + id + '?access_token=' + this.readingReportManagerService.getAuthToken();
  }
  showAllImgs = () => {
    this.allImagesDataSource.imageUrlAndInfos.forEach((item, i) => {
      this.getExactImg(item.fileRepositorayId, i);
    })
    // to save data
    this.closeTabService.saveDataForRRGallery = this.imgsOriginUrl;
  }
  routeToOffload = (dataSource: IImageUrlAndInfos, rowIndex: number, imgOrig: any) => {
    this.carouselImage = dataSource;
    this.carouselImage.imageUrl = imgOrig;
    this.rowIndex = rowIndex;
    this.showCarousel = true;
  }
  carouselNextItem = () => {
    this.rowIndex >= this.allImagesDataSource.imageUrlAndInfos.length - 1 ? this.rowIndex = 0 : this.rowIndex++;
    this.carouselImage = this.allImagesDataSource.imageUrlAndInfos[this.rowIndex];
    this.carouselImage.imageUrl = this.imgsOriginUrl[this.rowIndex];
  }
  carouselPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.allImagesDataSource.imageUrlAndInfos.length - 1 : this.rowIndex--;
    this.carouselImage = this.allImagesDataSource.imageUrlAndInfos[this.rowIndex];
    this.carouselImage.imageUrl = this.imgsOriginUrl[this.rowIndex];
  }
  carouselCancelClicked = () => {
    this.showCarousel = false;
  }

}
