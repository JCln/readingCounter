import { Component, Input, OnInit } from '@angular/core';

import { EditContactManagerService } from './../../../../services/edit-contact-manager.service';

@Component({
  selector: 'app-select-zone',
  templateUrl: './select-zone.component.html',
  styleUrls: ['./select-zone.component.scss']
})
export class SelectZoneComponent implements OnInit {
  switchDisplay: boolean = false;
  // province config
  @Input() provinceItemsData: any;
  title: string = '';
  allComplete: boolean = false;

  constructor(
    private editUserManagerService: EditContactManagerService
  ) { }

  ngOnInit(): void {
  }

  someComplete(): boolean {
    const a: Array<any> = [];
    a.push(this.provinceItemsData);
    if (this.provinceItemsData.regionItems == null) {
      return false;
    }
    return this.provinceItemsData.regionItem.filter(t => t.isSelected).length > 0 && !this.allComplete
  }
  setAll(completed: boolean) {
    this.allComplete = completed;
    this.provinceItemsData.forEach(l1 => {
      l1.isSelected = completed,
        l1.regionItems.forEach(l2 => {
          l2.isSelected = completed,
            l2.zoneItems.forEach(l3 => {
              l3.isSelected = completed
            })
        });
    })
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
  setAllL2(completed: boolean, subtask: any) {
    subtask.zoneItems.forEach(t => {
      t.isSelected = completed
    });
  }
  getAZoneItems = () => {
    this.editUserManagerService.getAUserProvince(this.provinceItemsData);
  }
}