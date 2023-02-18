import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IImageUrlAndInfos, IImageUrlInfoWrapper } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ToolsService } from 'services/tools.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-random-images',
  templateUrl: './random-images.component.html',
  styleUrls: ['./random-images.component.scss']
})
export class RandomImagesComponent extends FactoryONE {
  userCounterReader: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _quantity: ITitleValue[] = [];
  rowIndex: number = 0;
  showCarousel: boolean = false;

  allImagesDataSource: IImageUrlInfoWrapper;
  carouselImage: IImageUrlAndInfos;
  imgsOriginUrl: any[] = [];

  constructor(
    public toolsService: ToolsService,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    this.zoneDictionary = await this.toolsService.getZoneDictionary();
    this._quantity = this.toolsService.getQuantity();
    this.verificationACounterReaderId();
    if (this.closeTabService.saveDataForRandomImgs) {
      this.allImagesDataSource = this.closeTabService.saveDataForRandomImgsRSFirst;
      this.imgsOriginUrl = this.closeTabService.saveDataForRandomImgs;
    }
  }
  verificationACounterReaderId = async () => {
    let temp: IDictionaryManager[] = [];
    if (!MathS.isNull(this.toolsService.randomImages.zoneId)) {
      temp = await this.toolsService.getUserCounterReaders(this.toolsService.randomImages.zoneId);
      if (!MathS.isNull(temp)) {
        this.userCounterReader = temp;
      }
    }
  }
  connectToServer = async () => {
    if (this.toolsService.verificationImageCarousel(this.toolsService.randomImages)) {
      this.allImagesDataSource = await this.toolsService.postDataSource(ENInterfaces.postToolsRandomImages, this.toolsService.randomImages);
      this.closeTabService.saveDataForRandomImgsRSFirst = this.allImagesDataSource;
      this.showAllImgs();
    }
  }

  showAllImgs = () => {
    this.allImagesDataSource.imageUrlAndInfos.forEach((item, i) => {
      this.getExactImg(item.fileRepositorayId, i);
    })
    // to save data
    this.closeTabService.saveDataForRandomImgs = this.imgsOriginUrl;
  }
  getExactImg = async (id: string, index: number) => {
    this.imgsOriginUrl[index] = this.toolsService.getApiUrl() + '/' + ENInterfaces.downloadFileByUrl + '/' + id + '?access_token=' + this.toolsService.getAuthToken();
  }
  routeToOffload = (dataSource: IImageUrlAndInfos, rowIndex: number, imgOrigin: any) => {
    this.carouselImage = dataSource;
    this.carouselImage.imageUrl = imgOrigin;
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
