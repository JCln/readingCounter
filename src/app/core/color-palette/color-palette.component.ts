import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ENThemeColor } from 'interfaces/istyles';
import { ThemeService } from 'services/theme.service';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
  animations: [
    trigger('openClose', [
      state('closeSubItems', style({
        visibility: 'hidden',
        height: '0',
        width: '0',
        opacity: '0'
      })),
      state('openSubItems', style({
        visibility: 'visible',
        padding: '.25rem 0.5rem',
        height: 'auto',
        width: 'auto',
        opacity: '1'
      })),
      transition('closeSubItems <=> openSubItems', animate('150ms ease-in-out'))
    ])
  ]
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
