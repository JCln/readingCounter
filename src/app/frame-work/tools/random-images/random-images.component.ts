import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IImageUrlAndInfos, IImageUrlInfoWrapper } from 'interfaces/ireports';
import { DownloadManagerService } from 'services/download-manager.service';
import { ToolsService } from 'services/tools.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-random-images',
  templateUrl: './random-images.component.html',
  styleUrls: ['./random-images.component.scss']
})
export class RandomImagesComponent extends FactoryONE {
  isCollapsed: boolean = false;
  userCounterReader: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _quantity: ITitleValue[] = [];
  showCarousel: boolean = false;
  rowIndex: number = 0;

  allImagesDataSource: IImageUrlInfoWrapper;
  carouselImage: IImageUrlAndInfos;
  imgsOriginUrl: any[] = [];

  constructor(
    public toolsService: ToolsService,
    private downloadManagerService: DownloadManagerService
  ) {
    super();
  }

  classWrapper = async () => {
    this.zoneDictionary = await this.toolsService.getZoneDictionary();
    this._quantity = this.toolsService.getQuantity();
  }
  verificationACounterReaderId = async () => {
    let temp: IDictionaryManager[] = [];
    if (!MathS.isNull(this.toolsService.randomImages.zoneId))
      temp = await this.toolsService.getUserCounterReaders(this.toolsService.randomImages.zoneId);
    if (!MathS.isNull(temp)) {
      this.userCounterReader = temp;
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
    this.imgsOriginUrl[index] = await this.downloadManagerService.downloadFile(id);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imgsOriginUrl[index] = reader.result;
      // this.closeTabService.saveDataForRRGallery[index] = reader.result;
      this.allImagesDataSource.imageUrlAndInfos[index].imageUrl = reader.result;
    }, false);
    if (this.imgsOriginUrl[index]) {
      reader.readAsDataURL(this.imgsOriginUrl[index]);
      reader.readAsDataURL(this.allImagesDataSource.imageUrlAndInfos[index].imageUrl);
    }
  }
  routeToOffload = (dataSource: IImageUrlAndInfos, rowIndex: number) => {
    this.carouselImage = dataSource;
    scrollTo(0, 0);
    this.rowIndex = rowIndex;
    this.showCarousel = true;
  }
  carouselNextItem = () => {
    this.rowIndex > this.allImagesDataSource.imageUrlAndInfos.length - 2 ? this.rowIndex = 0 : this.rowIndex++;
    this.carouselImage = this.allImagesDataSource.imageUrlAndInfos[this.rowIndex];
  }
  carouselPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.allImagesDataSource.imageUrlAndInfos.length - 1 : this.rowIndex--;
    this.carouselImage = this.allImagesDataSource.imageUrlAndInfos[this.rowIndex];
  }
  carouselCancelClicked = () => {
    this.showCarousel = false;
  }

}
