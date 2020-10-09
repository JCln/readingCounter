import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  firstClick: boolean;
  secondClick: boolean;
  selectedCapacity: string = '';
  leastTextCapacity: string[] = ['4 نویسه', '6 نویسه', '8 نویسه', '10 نویسه'];

  haveBigTextRight = 'حروف بزرگ';
  haveBigTextLeft = 'حروف بزرگ نباشد';
  haveSmallTextRight = 'حروف کوچک';
  haveSmallTextLeft = 'حروف کوچک نباشد';

  constructor() { }

  receiveMessage($event) {
    this.firstClick = $event;
  }
  receiveSecond($event) {
    this.secondClick = $event;
  }

  ngOnInit(): void {
  }

}
