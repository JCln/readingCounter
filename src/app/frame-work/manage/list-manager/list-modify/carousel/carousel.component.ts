import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOnOffLoadFlat } from 'interfaces/imanage';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() dataSource: IOnOffLoadFlat;

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
