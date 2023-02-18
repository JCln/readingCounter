import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EnvService } from 'services/env.service';
import { JwtService } from 'src/app/auth/jwt.service';

@Component({
  selector: 'app-show-img-dg',
  templateUrl: './show-img-dg.component.html',
  styleUrls: ['./show-img-dg.component.scss']
})
export class ShowImgDgComponent implements OnInit {
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
