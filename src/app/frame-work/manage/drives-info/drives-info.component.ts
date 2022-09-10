import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IManageDrivesInfo } from 'interfaces/iserver-manager';
import { ManageServerService } from 'services/manage-server.service';

@Component({
  selector: 'app-drives-info',
  templateUrl: './drives-info.component.html',
  styleUrls: ['./drives-info.component.scss']
})
export class DrivesInfoComponent implements OnInit {
  dataSource: IManageDrivesInfo[] = [];
  temp: any[] = [];

  constructor(
    private manageServerService: ManageServerService
  ) { }

  classWrapper = async () => {
    this.dataSource = await this.manageServerService.GETDataServer(ENInterfaces.serverManagerDrivesInfo);
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
    for (let index = 0; index < this.dataSource.length; index++) {
      this.temp[index] = this.getObjectParameters(this.dataSource[index])
    }

  }


}
