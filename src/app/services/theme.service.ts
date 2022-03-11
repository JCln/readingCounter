import { Injectable } from '@angular/core';
import { ENThemeColor, ENThemeName, Theme } from 'interfaces/ioverall-config';
import { BrowserStorageService } from 'services/browser-storage.service';

import { bedge, corporate, dark, light } from '../theme/themes';
import { purple } from './../theme/themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark, purple, bedge, corporate];
  private colors = [
    { id: 1, color: 0, colorName: 'white' },
    { id: 2, color: 1, colorName: 'rgb(14, 76, 146)' },
    { id: 3, color: 2, colorName: 'rgb(127 ,108, 153)' },
    { id: 4, color: 3, colorName: 'rgb(93 ,80 ,110)' },
    // { id: 5, color: 4, colorName: 'rgb(247 ,249 ,252)' },
  ];

  constructor(
    private browserStorageService: BrowserStorageService
  ) {
    this.themeStatus();
  }

  getColors = () => {
    return this.colors;
  }
  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }
  getActiveTheme(): Theme {
    return this.active;
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
  setCorporateTheme(): void {
    this.setTheme(corporate, ENThemeColor.corporate);
  }
  setBedgeTheme(): void {
    this.setTheme(bedge, ENThemeColor.bedge);
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
      case ENThemeColor.bedge:
        this.setBedgeTheme();
        break;
      case ENThemeColor.corporate:
        this.setCorporateTheme();
        break;

      default:
        this.setLightTheme();
        break;
    }
  }
  themeStatus = () => this.getFromLocalStorage(ENThemeName.themeColor);
}
