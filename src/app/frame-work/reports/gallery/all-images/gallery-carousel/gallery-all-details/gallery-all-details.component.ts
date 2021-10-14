import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-gallery-all-details',
  templateUrl: './gallery-all-details.component.html',
  styleUrls: ['./gallery-all-details.component.scss']
})
export class GalleryAllDetailsComponent implements OnChanges {

  @Input() eshterak: string;
  @Input() imageDescription: string;
  @Input() description: string;
  @Input() firstName: string;
  @Input() sureName: string;
  @Input() radif: number;
  @Input() sizeInByte: number;

  @Input() allImages: any;

  constructor(
  ) { }

  classWrapper = async (canRefresh?: boolean) => {
    // this.imageFiles = [];
    // this.allImages = [];


    // this.counterStatesDictionary = await this.trackingManagerService.getCounterStateByCodeDictionary(parseInt(this.zoneId));
    // this.downloadManagerService.assignToDataSource(this.dataSource);
    // this.modifyType = this.trackingManagerService.getOffloadModifyType();
    // this.offloadItems = this.trackingManagerService.getOffloadItems();
  }
  ngOnChanges(): void {
    this.classWrapper();
  }
}
