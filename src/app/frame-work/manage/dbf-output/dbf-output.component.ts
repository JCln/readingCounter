import { Component, OnInit, ViewChild } from '@angular/core';
import { DateJalaliComponent } from 'src/app/core/_layouts/header/date-jalali/date-jalali.component';
import { IOutputManager } from 'src/app/Interfaces/imanage';
import { IZoneManager } from 'src/app/Interfaces/izone-manager';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

@Component({
  selector: 'app-dbf-output',
  templateUrl: './dbf-output.component.html',
  styleUrls: ['./dbf-output.component.scss']
})
export class DbfOutputComponent implements OnInit {
  @ViewChild(DateJalaliComponent) date;
  dbfOutput: IOutputManager;
  zoneDictionary: IZoneManager[] = [];

  constructor(
    private outputManagerService: OutputManagerService,
    private trackingManagerService: TrackingManagerService
  ) {
    this.dbfOutput = this.outputManagerService.getDBFOutPut;
  }

  connectToServer = () => {
    if (!this.outputManagerService.checkVertification(this.dbfOutput))
      return;
    this.trackingManagerService.downloadOutputDBF(this.dbfOutput).subscribe(res => {
      console.log(res);
    })
  }
  getZoneDictionary = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.trackingManagerService.getAllZoneTitles().subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  classWrapper = async () => {
    this.zoneDictionary = await this.getZoneDictionary();
  }
  receiveFromDateJalali = ($event: string) => {
    this.dbfOutput.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.dbfOutput.toDate = $event;
  }

  ngOnInit() {
    this.classWrapper();
  }
}
