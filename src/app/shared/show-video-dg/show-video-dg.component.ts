import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EnvService } from 'services/env.service';
import { JwtService } from 'src/app/auth/jwt.service';

@Component({
  selector: 'app-show-video-dg',
  templateUrl: './show-video-dg.component.html',
  styleUrls: ['./show-video-dg.component.scss']
})
export class ShowVideoDgComponent implements OnInit {
  originImage: string;

  constructor(
    public config: DynamicDialogConfig,
    private envService: EnvService,
    private jwtService: JwtService
  ) { }

  callApiImgs = async () => {
    this.originImage = this.envService.API_URL + '/' + ENInterfaces.downloadFileByUrl + '/' + this.config.data.body['fileRepositoryId'] + '?access_token=' + this.jwtService.getAuthorizationToken();
  }

  ngOnInit(): void {
    this.callApiImgs();
  }

}
