import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DownloadManagerService } from 'services/download-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IImageUrlAndInfos, IImageUrlInfoWrapper } from 'src/app/Interfaces/ireports';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.scss']
})
export class AllImagesComponent extends FactoryONE {

  interationOnOverallInfo: any[] = [];

  allImages: IImageUrlInfoWrapper;

  carouselAllImages: IImageUrlAndInfos;
  showCarousel: boolean = false;
  rowIndex: number = 0;

  constructor(
    private downloadManagerService: DownloadManagerService,
    private closeTabService: CloseTabService,
    private readingReportManagerService: ReadingReportManagerService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForWOUI = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.allImages = await this.readingReportManagerService.getDataSource(ENInterfaces.ListAllImages, 85979);
    this.showAllImgs();
  }
  showAllImgs = () => {
    this.allImages.imageUrlAndInfos.forEach((item, i) => {
      this.getExactImg(item.fileRepositorayId, i);
    })
  }
  getExactImg = async (id: string, index: number) => {
    if (this.allImages[index])
      return;
    const res = await this.downloadManagerService.downloadFile(id);
    this.allImages[index] = res;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.allImages[index] = reader.result;
    }, false);
    if (this.allImages[index]) {
      reader.readAsDataURL(this.allImages[index]);
    }
  }


  routeToOffload = (event: IImageUrlAndInfos, rowIndex: number, img: any) => {
    this.carouselAllImages = event;
    this.carouselAllImages.imageUrl = img;
    this.rowIndex = rowIndex;
    this.showCarousel = true;
    console.log(this.carouselAllImages);

  }
  carouselNextItem = () => {
    console.log(this.carouselAllImages);
    this.rowIndex >= this.allImages.imageUrlAndInfos.length - 1 ? this.rowIndex = 0 : this.rowIndex++;
    this.carouselAllImages = this.allImages[this.rowIndex];
    this.carouselAllImages.imageUrl = this.allImages.imageUrlAndInfos[this.rowIndex];
  }
  carouselPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.allImages.imageUrlAndInfos.length : this.rowIndex--;
    this.carouselAllImages = this.allImages.imageUrlAndInfos[this.rowIndex];
    this.carouselAllImages.imageUrl = this.allImages.imageUrlAndInfos[this.rowIndex];
  }
  carouselCancelClicked = () => {
    this.showCarousel = false;
  }

}
