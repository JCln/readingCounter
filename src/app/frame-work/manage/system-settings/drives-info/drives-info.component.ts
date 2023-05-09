import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ManageServerService } from 'services/manage-server.service';

@Component({
  selector: 'app-drives-info',
  templateUrl: './drives-info.component.html',
  styleUrls: ['./drives-info.component.scss']
})
export class DrivesInfoComponent implements OnInit {
  temp: any[] = [];

  constructor(
    private manageServerService: ManageServerService,
    public closeTabService: CloseTabService
  ) { }

  classWrapper = async () => {
    if (!this.closeTabService.saveDataForMsDriveInfo) {
      this.closeTabService.saveDataForMsDriveInfo = await this.manageServerService.GETDataServer(ENInterfaces.serverManagerDrivesInfo);
    }
    this.doSth();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  getObjectParameters = (sth: any): any[] => {
    let b = [];
    b.push(sth.freePercent);
    b.push(sth.usedPercent);
    return b;
  }
  doSth = () => {
    for (let index = 0; index < this.closeTabService.saveDataForMsDriveInfo.length; index++) {
      this.temp[index] = this.getObjectParameters(this.closeTabService.saveDataForMsDriveInfo[index])
    }

  }


}
