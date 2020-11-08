import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appItems, IUserEditManager } from 'src/app/Interfaces/iuser-manager';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

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

  getL2Status = (): boolean => {
    const a: Array<any> = [];
    a.push(this.provinceItemsData);

    const b = a.map(item => {
      return item.regionItems.every(sub_item => {
        return sub_item.zoneItems.every(sub_2 => {
          return sub_2.isSelected
        })
      })
    })
    return b.pop();
  }

  updateAllComplete() {
    this.allComplete = this.provinceItemsData.regionItems != null && this.provinceItemsData.regionItems.every(t => t.isChecked) && this.getL2Status();
  }

  someComplete(): boolean {
    return false;
    // const a: Array<any> = [];
    // a.push(this.provinceItemsData);
    // if (this.provinceItemsData.subCollection == null) {
    //   return false;
    // }
    // return this.provinceItemsData.subCollection.filter(t => t.isChecked).length > 0 && !this.allComplete

  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.provinceItemsData.subCollection == null) {
      return;
    }
    this.provinceItemsData.subCollection.forEach(t => {
      t.isChecked = completed,
        t.subCollection.forEach(y => {
          y.isChecked = completed
        })
    });
  }

  setAllL2(completed: boolean, subtask: any) {
    subtask.subCollection.forEach(t => {
      t.isChecked = completed
    });
  }
  ngOnInit(): void {
    this.UUid = this.route.snapshot.paramMap.get('id');
    this.getContactSource();
  }


}
