import { AfterViewInit, Component, Input } from '@angular/core';
import { ProfileService } from 'services/profile.service';

@Component({
  selector: 'app-gallery-all-details',
  templateUrl: './gallery-all-details.component.html',
  styleUrls: ['./gallery-all-details.component.scss']
})
export class GalleryAllDetailsComponent implements AfterViewInit {

  @Input() eshterak: string;
  @Input() imageDescription: string;
  @Input() description: string;
  @Input() firstName: string;
  @Input() sureName: string;
  @Input() radif: number;
  @Input() sizeInByte: number;
  @Input() zoneTitle: string;
  @Input() trackNumber: number;
  @Input() counterReaderName: string;
  @Input() counterNumber: number;
  @Input() counterStateTitle: string;

  @Input() allImages: any;
  degree: number = 0;

  constructor(
    public profileService: ProfileService
  ) { }

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
  addStylesToImg = () => {
    const a = this.profileService.getImg();
    const img = document.querySelector('.main-img') as HTMLElement;

    img.style.width = a.width;
    img.style.height = a.height;
    img.style.objectFit = a.objectFit;
  }
  ngAfterViewInit(): void {
    this.addStylesToImg();
  }

}