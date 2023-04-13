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
  userInputValue: any = { name: 'شماره پرونده', value: 'radif', type: 'number', insertedValue: '' };

  constructor(
    public toolsService: ToolsService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    this.zoneDictionary = await this.toolsService.getZoneDictionary();
    this.imageAttrAllDictionary = await this.toolsService.getImageAttributionAllDictionary();
    if (this.closeTabService.saveDataForImgResultDetailsRes) {
      this.allImagesDataSource = this.closeTabService.saveDataForImgResultDetailsResFirst;
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
        this.addCanShowElementToImages();
      }
    }
  }

  showAllImgs = () => {
    this.allImagesDataSource.imageUrlAndInfos.forEach((item, i) => {
      this.getExactImg(item.fileRepositorayId, i);
    })
  }
  getExactImg = async (id: string, index: number) => {
    this.closeTabService.saveDataForImgResultDetailsRes[index] = this.toolsService.getApiUrl() + '/' + ENInterfaces.downloadFileByUrl + '/' + id + '?access_token=' + this.toolsService.getAuthToken();
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
    this.carouselImage.imageUrl = this.closeTabService.saveDataForImgResultDetailsRes[this.rowIndex];
  }
  carouselPrevItem = () => {
    this.rowIndex < 1 ? this.rowIndex = this.allImagesDataSource.imageUrlAndInfos.length - 1 : this.rowIndex--;
    this.carouselImage = this.allImagesDataSource.imageUrlAndInfos[this.rowIndex];
    this.carouselImage.imageUrl = this.closeTabService.saveDataForImgResultDetailsRes[this.rowIndex];
  }
  carouselCancelClicked = () => {
    this.showCarousel = false;
  }
  addCanShowElementToImages = () => {
    for (let index = 0; index <= this.closeTabService.saveDataForImgResultDetailsResFirst.imageUrlAndInfos.length; index++)
      this.closeTabService.saveDataForImgResultDetailsResFirst.imageUrlAndInfos[index].canShow = true;
  }
  showItemOnSearch = (searchInOrder: string) => {
    const origin = this.closeTabService.saveDataForImgResultDetailsResFirst.imageUrlAndInfos;
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