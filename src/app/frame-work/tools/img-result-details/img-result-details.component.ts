import { EN_messages } from 'interfaces/enums.enum';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ENRandomNumbers, ENSnackBarColors } from 'interfaces/ioverall-config';
import { IImageUrlAndInfos, IImageUrlInfoWrapper } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ToolsService } from 'services/tools.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-img-result-details',
  templateUrl: './img-result-details.component.html',
  styleUrls: ['./img-result-details.component.scss'],
  animations: [transitionAnimation]
})
export class ImgResultDetailsComponent extends FactoryONE {
  imageAttrAllDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
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
    this.imageAttrAllDictionary = await this.toolsService.getImageAttributionAllDictionary();
    if (this.closeTabService.saveDataForImgResultDetailsRes) {
      this.allImagesDataSource = this.closeTabService.saveDataForImgResultDetailsResFirst;
      this.imgsOriginUrl = this.closeTabService.saveDataForImgResultDetailsRes;
    }
  }
  connectToServer = async () => {
    if (this.toolsService.verificationImageResultDetails(this.toolsService.imgResultDetails)) {
      this.allImagesDataSource = await this.toolsService.postDataSource(ENInterfaces.postImgAttrResultDetails, this.toolsService.imgResultDetails);
      if (this.allImagesDataSource.imageCount == ENRandomNumbers.zero) {
        this.toolsService.showSnack(EN_messages.notFound, ENSnackBarColors.warn);
      }
      else {
        this.closeTabService.saveDataForImgResultDetailsResFirst = this.allImagesDataSource;
        this.showAllImgs();
      }
    }
  }

  showAllImgs = () => {
    this.allImagesDataSource.imageUrlAndInfos.forEach((item, i) => {
      this.getExactImg(item.fileRepositorayId, i);
    })
    // to save data
    this.closeTabService.saveDataForImgResultDetailsRes = this.imgsOriginUrl;
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