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
    { id: 1, color: 0, colorName: 'white' },
    { id: 2, color: 1, colorName: 'gray' },
    { id: 3, color: 2, colorName: 'purple' },    
  ];

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
