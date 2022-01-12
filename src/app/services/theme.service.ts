import { Injectable } from '@angular/core';
import { ENThemeColor, ENThemeName, Theme } from 'interfaces/ioverall-config';
import { BrowserStorageService } from 'services/browser-storage.service';

import { dark, light } from '../theme/themes';
import { purple } from './../theme/themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark, purple];

  constructor(
    private browserStorageService: BrowserStorageService
  ) {
    this.themeStatus();
  }


  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }
  private setTheme = (theme: Theme, color: ENThemeColor) => {
    this.setActiveTheme(theme);
    this.saveToLocalStorage(ENThemeName.themeColor, color);
  }
  setDarkTheme(): void {
    this.setTheme(dark, ENThemeColor.dark);
  }
  setPurpleTheme(): void {
    this.setTheme(purple, ENThemeColor.purple);
  }
  setLightTheme(): void {
    this.setTheme(light, ENThemeColor.light);
  }

  private setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  private saveToLocalStorage = (name: ENThemeName, color: ENThemeColor) => {
    this.browserStorageService.set(name, color);
  }
  private getLastColor = (): ENThemeColor => {
    return this.browserStorageService.get(ENThemeName.themeColor);
  }
  private getFromLocalStorage = (name: ENThemeName) => {
    const a = this.browserStorageService.get(name);
    if (a === null) {
      this.setLightTheme();
      return;
    }
    this.setThemeColor(this.getLastColor());
  }
  setThemeColor = (colorName: ENThemeColor) => {
    switch (colorName) {
      case ENThemeColor.purple:
        this.setPurpleTheme();
        break;
      case ENThemeColor.dark:
        this.setDarkTheme();
        break;
      case ENThemeColor.light:
        this.setLightTheme();
        break;

      default:
        this.setLightTheme();
        break;
    }
  }
  themeStatus = () => this.getFromLocalStorage(ENThemeName.themeColor);
}
