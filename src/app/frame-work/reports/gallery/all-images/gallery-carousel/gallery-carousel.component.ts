import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IImageUrlAndInfos } from 'src/app/Interfaces/ireports';

@Component({
  selector: 'app-gallery-carousel',
  templateUrl: './gallery-carousel.component.html',
  styleUrls: ['./gallery-carousel.component.scss']
})
export class GalleryCarouselComponent {
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
