import { Injectable } from '@angular/core';
import { ENFontName, ENFontStyle, Theme } from 'interfaces/istyles';

import { fontS, fontSM, fontXS, fontXXS } from '../theme/fonts';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  private active: Theme = fontXS;
  private fonts = [
    { id: 0, font: 0, fontName: 'fontXXS' },
    { id: 1, font: 1, fontName: 'fontXS' },
    { id: 2, font: 2, fontName: 'fontS' },
    { id: 3, font: 3, fontName: 'fontSM' },
  ]

  constructor(
    private browserStorageService: BrowserStorageService
  ) {
    this.fontStatus();
  }

  getFonts = () => {
    return this.fonts;
  }
  getActiveFont(): Theme {
    return this.active;
  }

  private saveToLocalStorage = (name: ENFontName, color: ENFontStyle) => {
    this.browserStorageService.set(name, color);
  }
  private setActiveFont(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
  private setFont = (theme: Theme, font: ENFontStyle) => {
    this.setActiveFont(theme);
    this.saveToLocalStorage(ENFontName.fontStyle, font);
  }

  setFontXXS(): void {
    this.setFont(fontXXS, ENFontStyle.fontXXS);
  }
  setFontXS(): void {
    this.setFont(fontXS, ENFontStyle.fontXS);
  }
  setFontSM(): void {
    this.setFont(fontSM, ENFontStyle.fontSM);
  }
  setFontS(): void {
    this.setFont(fontS, ENFontStyle.fontS);
  }
  private getLastFont = (): ENFontStyle => {
    return this.browserStorageService.get(ENFontName.fontStyle);
  }

  setFontStyle = (colorName: ENFontStyle) => {
    switch (colorName) {
      case ENFontStyle.fontXXS:
        this.setFontXXS();
        break;
      case ENFontStyle.fontXS:
        this.setFontXS();
        break;
      case ENFontStyle.fontSM:
        this.setFontSM();
        break;
      case ENFontStyle.fontS:
        this.setFontS();
        break;
      default:
        this.setFontSM();
        break;
    }
  }
  private getFromLocalStorage = (name: ENFontName) => {
    const a = this.browserStorageService.get(name);
    if (a === null) {
      this.setFontS();
      return;
    }
    this.setFontStyle(this.getLastFont());
  }

  fontStatus = () => this.getFromLocalStorage(ENFontName.fontStyle);
} 