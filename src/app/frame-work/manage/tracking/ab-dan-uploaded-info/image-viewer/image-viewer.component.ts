import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @Input() open: boolean;
  @Input() imageURL: string;

  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.imageURL);

  }

}
