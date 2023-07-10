import { Component, OnInit } from '@angular/core';
import { ENThemeColor } from 'interfaces/istyles';
import { ThemeService } from 'services/theme.service';
import { transitionColorPalette } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
  animations: [transitionColorPalette]
})
export class ColorPaletteComponent implements OnInit {
  _showColorPalete: boolean = false;

  constructor(
    public themeService: ThemeService
  ) { }

  changeColor = (id: ENThemeColor) => {
    this.themeService.setThemeColor(id);
  }

  ngOnInit(): void {
  }

}
