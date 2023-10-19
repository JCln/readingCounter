import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-show-img-dg',
  templateUrl: './show-img-dg.component.html',
  styleUrls: ['./show-img-dg.component.scss']
})
export class ShowImgDgComponent implements OnInit {
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
