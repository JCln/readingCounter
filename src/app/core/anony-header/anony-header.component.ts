import { Component, OnInit } from '@angular/core';
import { EnvService } from 'services/env.service';
import { ThemeService } from 'services/theme.service';

@Component({
  selector: 'app-anony-header',
  templateUrl: './anony-header.component.html',
  styleUrls: ['./anony-header.component.scss']
})
export class AnonyHeaderComponent implements OnInit {
  provinceName: string;

  constructor(
    private envService: EnvService,
    public themeService: ThemeService
  ) {
    this.provinceName = this.envService.headerProvinceTitle;
  }

  ngOnInit(): void {
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }

}
