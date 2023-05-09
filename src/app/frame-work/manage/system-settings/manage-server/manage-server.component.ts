import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors } from 'interfaces/ioverall-config';
import { ENManageServers, IManageServer } from 'interfaces/iserver-manager';
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
    if (clickFunction == ENManageServers.resetApp)
      this.resetApp();
  }
  serverDelete = async () => {
    const temp: any = await this.manageServerService.postDataServer(ENInterfaces.serverManagerDelete);
    if (temp)
      this.manageServerService.showSnack(temp.message, ENSnackBarColors.success);
  }
  linkToHangfire = () => {
    this.manageServerService.linkToHangFire();
  }
  linkToHealthCheck = () => {
    this.manageServerService.linkToHealthCheck();
  }
  resetApp = async () => {
    const temp = await this.manageServerService.postDataServer(ENInterfaces.serverManagerResetApp);
    if (temp)
      this.manageServerService.showSnack(temp.message, ENSnackBarColors.success);
  }

}
