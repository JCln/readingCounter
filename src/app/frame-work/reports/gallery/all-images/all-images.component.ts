import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';
import { IImageUrlAndInfos, IImageUrlInfoWrapper } from 'src/app/interfaces/ireports';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.scss'],
  animations: [transitionAnimation]
})
export class AllImagesComponent extends FactoryONE {

  allImagesDataSource: IImageUrlInfoWrapper;

  carouselImage: IImageUrlAndInfos;
  showCarousel: boolean = false;
  rowIndex: number = 0;
  searchInOrder: any[] = [
    { name: 'شماره پرونده', value: 'radif', type: 'number' },
    { name: 'اشتراک', value: 'eshterak', type: 'number' },
    { name: 'وضعیت کنتور', value: 'counterStateTitle', type: 'string' },
  ]
  userInputValue: any = { name: 'شماره پرونده', value: 'radif', type: 'number', insertedValue: '' };

  constructor(
    public closeTabService: CloseTabService,
    public readingReportManagerService: ReadingReportManagerService
  ) {
    super();
  }

  connectToServer = async () => {
    if (!this.readingReportManagerService.verificationFollowUPTrackNumber(this.readingReportManagerService.trackNumberAllImages))
      return;
    this.allImagesDataSource = null;

    this.allImagesDataSource = await this.readingReportManagerService.getDataSource(ENInterfaces.ListAllImages, this.readingReportManagerService.trackNumberAllImages);
    this.closeTabService.saveDataForRRGalleryRSFirst = this.allImagesDataSource;
    this.closeTabService.saveDataForRRGalleryReq = this.readingReportManagerService.trackNumberAllImages;
    this.showAllImgs();
    this.addCanShowElementToImages();
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
      this.allImagesDataSource = this.closeTabService.saveDataForRRGalleryRSFirst;
    }
    if (this.closeTabService.saveDataForRRGalleryReq) {
      this.readingReportManagerService.trackNumberAllImages = this.closeTabService.saveDataForRRGalleryReq;
    }

  }
  getExactImg = async (id: string, index: number) => {
    this.closeTabService.saveDataForRRGallery[index] = this.readingReportManagerService.getApiUrl() + '/' + ENInterfaces.downloadFileByUrl + '/' + id + '?access_token=' + this.readingReportManagerService.getAuthToken();
  }
  showAllImgs = () => {
    this.allImagesDataSource.imageUrlAndInfos.forEach((item, i) => {
      this.getExactImg(item.fileRepositorayId, i);
    })
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
    this.carouselImage.imageUrl = this.closeTabService.saveDataForRRGallery[this.rowIndex];
  }
  carouselPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.allImagesDataSource.imageUrlAndInfos.length - 1 : this.rowIndex--;
    this.carouselImage = this.allImagesDataSource.imageUrlAndInfos[this.rowIndex];
    this.carouselImage.imageUrl = this.closeTabService.saveDataForRRGallery[this.rowIndex];
  }
  carouselCancelClicked = () => {
    this.showCarousel = false;
  }
  addCanShowElementToImages = () => {
    for (let index = 0; index <= this.closeTabService.saveDataForRRGalleryRSFirst.imageUrlAndInfos.length; index++)
      this.closeTabService.saveDataForRRGalleryRSFirst.imageUrlAndInfos[index].canShow = true;
  }
  showItemOnSearch = (searchInOrder: string) => {
    const origin = this.closeTabService.saveDataForRRGalleryRSFirst.imageUrlAndInfos;
    if (origin) {
      for (let index = 0; index < origin.length; index++) {
        // if anything exist for filter images
        if (this.userInputValue.insertedValue) {
          if (origin[index][searchInOrder].toString().includes(this.userInputValue.insertedValue)) {
            origin[index].canShow = true;
          }
          else {
            origin[index].canShow = false;
          }
        }
        else {
          origin[index].canShow = true;
        }

      }
    }
  }

}
