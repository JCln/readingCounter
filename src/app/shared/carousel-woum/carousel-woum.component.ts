import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOnOffLoadFlat } from 'interfaces/imanage';

@Component({
  selector: 'app-carousel-woum',
  templateUrl: './carousel-woum.component.html',
  styleUrls: ['./carousel-woum.component.scss']
})
export class CarouselWoumComponent {
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
