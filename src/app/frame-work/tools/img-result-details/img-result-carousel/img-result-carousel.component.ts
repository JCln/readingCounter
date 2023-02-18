import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IImageUrlAndInfos } from 'interfaces/ireports';

@Component({
  selector: 'app-img-result-carousel',
  templateUrl: './img-result-carousel.component.html',
  styleUrls: ['./img-result-carousel.component.scss']
})
export class ImgResultCarouselComponent {
  @Input() dataSource: IImageUrlAndInfos;

  @Output() nextClicked = new EventEmitter<any>();
  @Output() prevClicked = new EventEmitter<any>();
  @Output() cancelClicked = new EventEmitter<any>();

  constructor() { }

  nextClick = () => {
    this.nextClicked.emit();
  }
  prevClick = () => {
    this.prevClicked.emit();
  }
  cancelClick = () => {
    this.cancelClicked.emit();
  }

}
