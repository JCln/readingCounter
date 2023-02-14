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
        display: 'none'
      })),
      state('openSubItems', style({
        display: 'inline',
        padding: '.85rem 1rem'
      })),
      transition('closeSubItems <=> openSubItems', animate('250ms ease-in-out'))
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
