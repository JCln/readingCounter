import { Component, OnInit } from '@angular/core';
import { ManageServerService } from 'services/manage-server.service';
import { IManageServer } from 'src/app/Interfaces/imanage';


@Component({
  selector: 'app-manage-server',
  templateUrl: './manage-server.component.html',
  styleUrls: ['./manage-server.component.scss']
})
export class ManageServerComponent implements OnInit {
  manageTasks: IManageServer[];

  constructor(private manageServerService: ManageServerService) { }

  ngOnInit(): void {
    console.log(1);
    console.log(this.manageTasks);

    this.manageTasks = this.manageServerService.getManageServerItems();
  }

}
