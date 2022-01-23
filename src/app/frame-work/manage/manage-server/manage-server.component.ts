import { Component, OnInit } from '@angular/core';
import { ENManageServers, IManageServer } from 'interfaces/imanage';
import { ENSnackBarColors } from 'interfaces/ioverall-config';
import { ManageServerService } from 'services/manage-server.service';


@Component({
  selector: 'app-manage-server',
  templateUrl: './manage-server.component.html',
  styleUrls: ['./manage-server.component.scss']
})
export class ManageServerComponent implements OnInit {
  manageTasks: IManageServer[];

  constructor(private manageServerService: ManageServerService) { }

  ngOnInit(): void {
    this.manageTasks = this.manageServerService.getManageServerItems();
  }
  manageFuncs = (clickFunction: ENManageServers) => {
    if (clickFunction == ENManageServers.serverDelete)
      this.serverDelete();
    if (clickFunction == ENManageServers.linkToHangfire)
      this.linkToHangfire();
    if (clickFunction == ENManageServers.linkToHealthCheck)
      this.linkToHealthCheck();
  }
  serverDelete = async () => {
    const temp: any = await this.manageServerService.postDataServer();
    if (temp)
      this.manageServerService.showSnack(temp.message, ENSnackBarColors.success);
  }
  linkToHangfire = () => {
    this.manageServerService.linkToHangFire();
  }
  linkToHealthCheck = () => {
    this.manageServerService.linkToHealthCheck();
  }

}
