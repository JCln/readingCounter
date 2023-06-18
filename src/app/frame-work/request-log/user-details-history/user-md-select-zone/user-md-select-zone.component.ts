import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-md-select-zone',
  templateUrl: './user-md-select-zone.component.html',
  styleUrls: ['./user-md-select-zone.component.scss']
})
export class UserMdSelectZoneComponent {
  switchDisplay: boolean = false;
  // province config
  @Input() provinceItemsData: any;
  title: string = '';
  allComplete: boolean = false;

  someComplete(): boolean {
    const a: Array<any> = [];
    a.push(this.provinceItemsData);
    if (this.provinceItemsData.regionItems == null) {
      return false;
    }
    return this.provinceItemsData.regionItem.filter(t => t.isSelected).length > 0 && !this.allComplete
  }
  updateAll = (provinceIt: any) => {
    const a = provinceIt.regionItems.every(l1 => {
      return l1.isSelected
    })
    provinceIt.isSelected = a;
  }
  updateAllL2Complete(regionIt: any) {
    const a = regionIt.zoneItems.every(zoneIt => {
      return zoneIt.isSelected && this.updateAll
    })
    regionIt.isSelected = a;
  }
}
