import { UtilsService } from 'services/utils.service';
import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ImageAttributionFile } from 'interfaces/tools';
import { ProfileService } from 'services/profile.service';
import { Converter } from 'src/app/classes/converter';
import { ENSnackBarTimes, ENSnackBarColors } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';

@Component({
  selector: 'app-img-result-details-carousel',
  templateUrl: './img-result-details-carousel.component.html',
  styleUrls: ['./img-result-details-carousel.component.scss']
})
export class ImgResultDetailsCarouselComponent implements OnChanges, AfterViewInit {

  @Input() fileRepositoryId: string;
  @Input() onOffLoadId: string;
  @Input() eshterak: string;
  @Input() firstName: string;
  @Input() sureName: string;
  @Input() radif: string;
  @Input() sizeInByte: string;
  @Input() allImages: any;
  @Input() imageDescription: string;
  @Input() zoneTitle: string;
  @Input() trackNumber: number;
  @Input() counterReaderName: string;
  @Input() counterNumber: number;
  @Input() counterStateTitle: string;

  degree: number = 0;
  dictionary: IDictionaryManager[] = [];
  _addOrEdit: ImageAttributionFile = {
    imageAttributionIds: [],
    fileRepositoryId: '',
    onOffLoadId: ''
  };


  constructor(
    public utilsService: UtilsService,
    public profileService: ProfileService
  ) { }

  getImageAttributionFile = async () => {
    if (this.fileRepositoryId)
      this.dictionary = (await this.utilsService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.getImageAttributionAll, this.fileRepositoryId)).dictionary;
  }
  ngOnChanges(): void {
    this.getImageAttributionFile();
  }
  connectToServer = async () => {
    this._addOrEdit.onOffLoadId = this.onOffLoadId;
    this._addOrEdit.fileRepositoryId = this.fileRepositoryId;
    this._addOrEdit.imageAttributionIds = Converter.customizeSelectedOptionsId(this.dictionary);

    const res = await this.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.getImageAttributionAddOrEdit, this._addOrEdit);
    if (res)
      this.utilsService.snackBarMessage(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);

  }
  rotateRightImg = () => {
    const a = document.querySelector('.main-img') as HTMLElement;
    this.degree += 90;
    a.style.transform = `rotate(${this.degree + 'deg'}`;
  }
  rotateLeftImg = () => {
    const a = document.querySelector('.main-img') as HTMLElement;
    this.degree -= 90;
    a.style.transform = `rotate(${this.degree + 'deg'}`;
  }
  addStylesToImg = () => {
    const a = this.profileService.getImg();
    const img = document.querySelector('.main-img') as HTMLElement;

    img.style.width = a.width;
    img.style.height = a.height;
    img.style.objectFit = a.objectFit;
  }
  ngAfterViewInit(): void {
    this.addStylesToImg();
  }
}
