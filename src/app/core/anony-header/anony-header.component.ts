import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { EnvService } from 'services/env.service';
import { ThemeService } from 'services/theme.service';

@Component({
  selector: 'app-anony-header',
  templateUrl: './anony-header.component.html',
  styleUrls: ['./anony-header.component.scss'],
  animations: [
    trigger('openClose', [
      state('closeSubItems', style({
        display: 'none'
      })),
      state('openSubItems', style({
        display: 'inline'
      })),
      transition('closeSubItems<=>openSubItems', animate('250ms ease-in-out'))
    ])
  ]
})
export class AnonyHeaderComponent {
  provinceName: string;
  _showColorPalete: boolean = false;
  testColors = [
    { id: 1, color: 0, colorName: 'blue' },
    { id: 2, color: 1, colorName: 'red' },
    { id: 3, color: 2, colorName: 'green' },
    { id: 4, color: 3, colorName: 'yellow' },
  ];

  constructor(
    private envService: EnvService,
    public themeService: ThemeService
  ) {
    this.provinceName = this.envService.headerProvinceTitle;
  }

  changeColor = (id: number) => {
    console.log(id);

    this.themeService.setThemeColor(id);
  }

}
