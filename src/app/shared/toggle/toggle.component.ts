import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  firstClick: boolean;
  secondClick: boolean;
  @Input() rightText: string;
  @Input() leftText: string;
  @Input() leftIcon: string;
  @Input() rightIcon: string;

  @Output() messageEvent = new EventEmitter<boolean>();
  @Output() secondClickEvent = new EventEmitter<boolean>();

  constructor() { }

  sendMessage() {
    this.firstClick = !this.firstClick;
    this.messageEvent.emit(this.firstClick);
  }
  secondClicked = () => {
    this.firstClick = false;  
    this.messageEvent.emit(this.secondClick);
  }

  ngOnInit(): void {
  }

}
