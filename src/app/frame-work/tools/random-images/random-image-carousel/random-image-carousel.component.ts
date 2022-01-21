import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IImageUrlAndInfos } from 'interfaces/ireports';

@Component({
  selector: 'app-random-image-carousel',
  templateUrl: './random-image-carousel.component.html',
  styleUrls: ['./random-image-carousel.component.scss']
})
export class RandomImageCarouselComponent {
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
