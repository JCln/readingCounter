import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';

@Component({
  selector: 'app-log-memory-status',
  templateUrl: './log-memory-status.component.html',
  styleUrls: ['./log-memory-status.component.scss']
})
export class LogMemoryStatusComponent implements OnInit {
  temp: any[] = [];

  constructor(
    private securityService: SecurityService,
    public closeTabService: CloseTabService,
  ) { }

  doSth = () => {
    this.temp.push(this.closeTabService.logMemoryStatus.remainedCount);
    this.temp.push(this.closeTabService.logMemoryStatus.logCount);
  }
  classWrapper = async (canRefresh?: boolean) => {
    // console.log(this.closeTabService.logMemoryStatus.systemDateTime);
    // if (canRefresh) {
    //   this.closeTabService.logMemoryStatus.systemDateTime = '';
    // }
    // if (!this.closeTabService.logMemoryStatus.systemDateTime) {
    this.closeTabService.logMemoryStatus = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.requestLogLogMemoryStatus);
    //   console.log(this.closeTabService.logMemoryStatus);
    // }
    this.doSth();
  }
  ngOnInit(): void {
    this.classWrapper();
  }


}
