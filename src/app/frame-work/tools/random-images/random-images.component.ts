import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IImageUrlAndInfos, IImageUrlInfoWrapper } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ToolsService } from 'services/tools.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-random-images',
  templateUrl: './random-images.component.html',
  styleUrls: ['./random-images.component.scss'],
  animations: [transitionAnimation]
})
export class RandomImagesComponent extends FactoryONE {
  userCounterReader: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _quantity: ITitleValue[] = [];
  rowIndex: number = 0;
  showCarousel: boolean = false;

  allImagesDataSource: IImageUrlInfoWrapper;
  carouselImage: IImageUrlAndInfos;

  userInputValue: any = { name: 'شماره پرونده', value: 'radif', type: 'number', insertedValue: '' };
  constructor(
    public toolsService: ToolsService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    this.zoneDictionary = await this.toolsService.dictionaryWrapperService.getZoneDictionary();
    this._quantity = this.toolsService.getQuantity();
    this.verificationACounterReaderId();
    if (this.closeTabService.saveDataForRandomImgs) {
      this.allImagesDataSource = this.closeTabService.saveDataForRandomImgsRSFirst;
    }
  }
  verificationACounterReaderId = async () => {
    let temp: IDictionaryManager[] = [];
    if (!MathS.isNull(this.toolsService.randomImages.zoneId)) {
      temp = await this.toolsService.dictionaryWrapperService.getUserCounterReaderDictionary(this.toolsService.randomImages.zoneId);
      if (!MathS.isNull(temp)) {
        this.userCounterReader = temp;
      }
    }
  }
  connectToServer = async () => {
    if (this.toolsService.verificationImageCarousel(this.toolsService.randomImages)) {
      this.allImagesDataSource = await this.toolsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.postToolsRandomImages, this.toolsService.randomImages);
      this.closeTabService.saveDataForRandomImgsRSFirst = this.allImagesDataSource;
      this.showAllImgs();
      this.addCanShowElementToImages();
    }
  }

  showAllImgs = () => {
    this.allImagesDataSource.imageUrlAndInfos.forEach((item, i) => {
      this.getExactImg(item.fileRepositorayId, i);
    })
  }
  getExactImg = async (id: string, index: number) => {
    this.closeTabService.saveDataForRandomImgs[index] = this.toolsService.getApiUrl() + '/' + ENInterfaces.downloadFileByUrl + '/' + id + '?access_token=' + this.toolsService.getAuthToken();
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
    this.carouselImage.imageUrl = this.closeTabService.saveDataForRandomImgs[this.rowIndex];
  }
  carouselPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.allImagesDataSource.imageUrlAndInfos.length - 1 : this.rowIndex--;
    this.carouselImage = this.allImagesDataSource.imageUrlAndInfos[this.rowIndex];
    this.carouselImage.imageUrl = this.closeTabService.saveDataForRandomImgs[this.rowIndex];
  }
  carouselCancelClicked = () => {
    this.showCarousel = false;
  }
  addCanShowElementToImages = () => {
    for (let index = 0; index <= this.closeTabService.saveDataForRandomImgsRSFirst.imageUrlAndInfos.length; index++)
      this.closeTabService.saveDataForRandomImgsRSFirst.imageUrlAndInfos[index].canShow = true;
  }
  showItemOnSearch = (searchInOrder: string) => {
    const origin = this.closeTabService.saveDataForRandomImgsRSFirst.imageUrlAndInfos;
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
