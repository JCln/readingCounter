import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-all-details',
  templateUrl: './gallery-all-details.component.html',
  styleUrls: ['./gallery-all-details.component.scss']
})
export class GalleryAllDetailsComponent {

  @Input() eshterak: string;
  @Input() imageDescription: string;
  @Input() description: string;
  @Input() firstName: string;
  @Input() sureName: string;
  @Input() radif: number;
  @Input() sizeInByte: number;

  @Input() allImages: any;
  degree: number = 0;

  constructor() { }
  
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