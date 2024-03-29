import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProfileService } from 'services/profile.service';
@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],

})
export class ImageViewerComponent implements OnInit, AfterViewInit {
  imageURL: string = '';
  degree: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.imageURL = this.config.data;
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

