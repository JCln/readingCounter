import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appItems, IUserEditManager } from 'src/app/Interfaces/iuser-manager';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { IRoleItems } from './../../../Interfaces/iuser-manager';
import { EditContactManagerService } from './../../../services/edit-contact-manager.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  UUid: string = '';
  editContactData: appItems[] = [];
  allUserData: IUserEditManager;
  provinceItemsData: any;// any for now  but need interface
  // province config
  title: string = '';
  allComplete: boolean = false;
  // 
  // edit config
  roleItemsData: IRoleItems[] = [];
  // 

  constructor(
    private route: ActivatedRoute,
    private editContactManagerService: EditContactManagerService,
    private interfaceManagerService: InterfaceManagerService
  ) {
  }

  getContactSource = () => {
    this.interfaceManagerService.getUserContactManager(this.UUid).subscribe((res: IUserEditManager) => {
      if (res) {
        console.log(res);

        this.allUserData = res;
        this.editContactData = res.appItems;
        this.provinceItemsData = res.provinceItems;
        this.roleItemsData = res.roleItems;
      }
    })
  }
  editContactSource = async () => {
    const a = await this.editContactManagerService.editAUserContact(this.editContactData, this.allUserData);
    console.log(a);

    // this.interfaceManagerService.postUserContactManager(a).subscribe(res => {
    //   if (res) {
    //     console.log(res);

    //   }
    // })
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
    // if (this.provinceItemsData.regionItems == null) {
    //   return;
    // }
    // console.log(completed);
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
  ngOnInit(): void {
    this.UUid = this.route.snapshot.paramMap.get('id');
    this.getContactSource();
  }
  provinceDisplayType = () => {
    let a = document.querySelector('._content') as HTMLElement;
    let b = document.querySelector('.l_3_c') as HTMLElement;
    a.classList.toggle('toggle_content');
    b.classList.toggle('toggle');
  }

}
