import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IImageUrlAndInfos, IImageUrlInfoWrapper } from 'interfaces/ireports';
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

  allImagesDataSource: IImageUrlInfoWrapper;
  carouselImage: IImageUrlAndInfos;
  imgsOriginUrl: any[] = [];

  constructor(
    public toolsService: ToolsService
  ) {
    super();
  }

  classWrapper = async () => {
    this.zoneDictionary = await this.toolsService.getZoneDictionary();
    this._quantity = this.toolsService.getQuantity();
    this.verificationACounterReaderId();
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
      this.showAllImgs();
    }
  }

  showAllImgs = () => {
    this.allImagesDataSource.imageUrlAndInfos.forEach((item, i) => {
      this.getExactImg(item.fileRepositorayId, i);
    })
  }
  getExactImg = async (id: string, index: number) => {
    this.imgsOriginUrl[index] = this.toolsService.getApiUrl() + '/' + ENInterfaces.downloadFileByUrl + '/' + id + '?access_token=' + this.toolsService.getAuthToken();
  }
  routeToOffload = (dataSource: IImageUrlAndInfos, rowIndex: number, imgOrigin: any) => {
    this.carouselImage = dataSource;
    this.carouselImage.imageUrl = imgOrigin;
    scrollTo(0, 0);
    this.rowIndex = rowIndex;
    this.toolsService.showCarousel = true;
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
    this.toolsService.showCarousel = false;
  }

}
