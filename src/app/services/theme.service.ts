import { Injectable } from '@angular/core';
import { ENThemeColor, ENThemeName, Theme } from 'interfaces/ioverall-config';
import { BrowserStorageService } from 'services/browser-storage.service';

import { dark, light } from '../theme/themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark];

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

  setDarkTheme(): void {
    this.setActiveTheme(dark);
    this.saveToLocalStorage(ENThemeName.themeColor, ENThemeColor.dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
    this.saveToLocalStorage(ENThemeName.themeColor, ENThemeColor.light);
  }

  setActiveTheme(theme: Theme): void {
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

  private getFromLocalStorage = (name: ENThemeName) => {
    const a = this.browserStorageService.get(name);
    if (a === null) {
      this.setLightTheme();
      return;
    }
    a === 0 ? this.setLightTheme() : this.setDarkTheme()
  }
  
  toggleTheme = () => {
    this.isDarkTheme() ? this.setLightTheme() : this.setDarkTheme();
  }
  themeStatus = () => this.getFromLocalStorage(ENThemeName.themeColor);
}
