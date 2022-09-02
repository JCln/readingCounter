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

  constructor(
    private manageServerService: ManageServerService
  ) { }

  classWrapper = async () => {
    this.dataSource = await this.manageServerService.postDataServer(ENInterfaces.serverManagerDrivesInfo);
  }
  ngOnInit(): void {
    this.classWrapper();
  }

}
