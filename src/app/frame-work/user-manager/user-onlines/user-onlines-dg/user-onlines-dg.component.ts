import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UsersAllService } from 'services/users-all.service';

@Component({
  selector: 'app-user-onlines-dg',
  templateUrl: './user-onlines-dg.component.html',
  styleUrls: ['./user-onlines-dg.component.scss']
})
export class UserOnlinesDgComponent implements OnInit {
  object = {
    userId: '',
    title: '',
    message: '',
    color: ENSnackBarColors.info,
    seconds: ENSnackBarTimes.fiveMili,
    canSave: true,
    text: ENRandomNumbers.four
  };

  constructor(
    public config: DynamicDialogConfig,
    private userService: UsersAllService,
  ) { }

  classWrapper = async () => {
    const a = this.config.data._data;
    this.object.userId = a.userId;
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  postDataSource = () => {
    this.userService.postDataSource(ENInterfaces.signalRNotifDirectText, this.object);
  }

}
