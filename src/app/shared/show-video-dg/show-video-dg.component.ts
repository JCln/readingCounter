import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-show-video-dg',
  templateUrl: './show-video-dg.component.html',
  styleUrls: ['./show-video-dg.component.scss']
})
export class ShowVideoDgComponent implements OnInit {
  originImage: string;

  constructor(
    public config: DynamicDialogConfig,
    private utilsService: UtilsService
  ) { }

  callApiImgs = async () => {
    this.originImage = this.utilsService.getAPIUrl() + '/' + ENInterfaces.downloadFileByUrl + '/' + this.config.data.body['fileRepositoryId'] + ENInterfaces.accessTokenTile + this.utilsService.compositeService.getAccessToken();
  }

  ngOnInit(): void {
    this.callApiImgs();
  }

}
