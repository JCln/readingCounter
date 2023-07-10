import { Component } from '@angular/core';
import { EnvService } from 'services/env.service';
import { ThemeService } from 'services/theme.service';

@Component({
  selector: 'app-anony-header',
  templateUrl: './anony-header.component.html',
  styleUrls: ['./anony-header.component.scss']
})
export class AnonyHeaderComponent {
  provinceName: string;
  _showColorPalete: boolean = false;

  constructor(
    private envService: EnvService,
    public themeService: ThemeService
  ) {
    this.provinceName = this.envService.headerProvinceTitle;
  }

  changeColor = (id: number) => {
    this.themeService.setThemeColor(id);
  }

}
