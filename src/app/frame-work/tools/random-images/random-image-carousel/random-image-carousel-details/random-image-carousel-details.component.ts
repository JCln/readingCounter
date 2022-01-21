import { Component, Input, OnChanges } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors, IDictionaryManager } from 'interfaces/ioverall-config';
import { ToolsService } from 'services/tools.service';
import { Converter } from 'src/app/classes/converter';
import { ImageAttributionFile } from 'src/app/Interfaces/tools';

@Component({
  selector: 'app-random-image-carousel-details',
  templateUrl: './random-image-carousel-details.component.html',
  styleUrls: ['./random-image-carousel-details.component.scss']
})
export class RandomImageCarouselDetailsComponent implements OnChanges {

  @Input() fileRepositoryId: string;
  @Input() onOffLoadId: string;
  @Input() eshterak: string;
  @Input() firstName: string;
  @Input() sureName: string;
  @Input() radif: string;
  @Input() sizeInByte: string;
  @Input() allImages: any;
  @Input() imageDescription: string;

  degree: number = 0;
  dictionary: IDictionaryManager[] = [];
  _isCollapsed: boolean = false;
  _addOrEdit: ImageAttributionFile = {
    imageAttributionIds: [],
    fileRepositoryId: '',
    onOffLoadId: ''
  };


  constructor(
    private toolsService: ToolsService
  ) { }

  getImageAttributionFile = async () => {
    if (this.fileRepositoryId)
      this.dictionary = (await this.toolsService.getDataSource(ENInterfaces.getImageAttributionAll, this.fileRepositoryId)).dictionary;
  }
  ngOnChanges(): void {
    this.getImageAttributionFile();
  }
  connectToServer = async () => {
    this._addOrEdit.onOffLoadId = this.onOffLoadId;
    this._addOrEdit.fileRepositoryId = this.fileRepositoryId;
    this._addOrEdit.imageAttributionIds = Converter.customizeSelectedOptionsId(this.dictionary);

    const res = await this.toolsService.postDataSource(ENInterfaces.getImageAttributionAddOrEdit, this._addOrEdit);
    if (res)
      this.toolsService.showSnack(res.message, ENSnackBarColors.success);

  }
  downloadImg = (src: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${new Date().toLocaleDateString()}.jpg`;
    link.click();
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
}
