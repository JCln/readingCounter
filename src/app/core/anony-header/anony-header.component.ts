import { Component, OnInit } from '@angular/core';
import { EnvService } from 'services/env.service';

@Component({
  selector: 'app-anony-header',
  templateUrl: './anony-header.component.html',
  styleUrls: ['./anony-header.component.scss']
})
export class AnonyHeaderComponent implements OnInit {
  provinceName: string;

  constructor(
    private envService: EnvService
  ) {
    this.provinceName = this.envService.headerProvinceTitle;
  }

  ngOnInit(): void {
  }

}
