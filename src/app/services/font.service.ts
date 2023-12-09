import { Injectable } from '@angular/core';
import { ENFontFamily, ENFontFamilyName, ENFontName, ENFontStyle, Theme } from 'interfaces/istyles';

import { FontFamilyBKoodak, FontFamilyBLotus, fontS, fontSM, fontXS, fontXXS } from '../theme/fonts';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  private active: Theme = fontXS;
  private activeFontFamily: Theme = FontFamilyBLotus;
  private fonts = [
    { id: 0, font: 0, fontName: 'fontXXS' },
    { id: 1, font: 1, fontName: 'fontXS' },
    { id: 2, font: 2, fontName: 'fontS' },
    { id: 3, font: 3, fontName: 'fontSM' },
  ];
  private fontFamilies = [
    { id: 0, font: 0, fontName: 'BLotus' },
    { id: 1, font: 1, fontName: 'BKoodak' }
  ]

  constructor(
    private browserStorageService: BrowserStorageService
  ) {
    this.fontStatus();
    this.fontFamilyStatus();
  }

  getFonts = () => {
    return this.fonts;
  }
  getFontFamily = () => {
    return this.fontFamilies;
  }
  getActiveFont(): Theme {
    return this.active;
  }
  getActiveFontFamily(): Theme {
    return this.activeFontFamily;
  }

  private saveToLocalStorage = (name: ENFontName, color: ENFontStyle) => {
    this.browserStorageService.setToLocal(name, color);
  }
  private saveToLocalStorageFontFamily = (name: ENFontFamilyName, value: ENFontFamily) => {
    this.browserStorageService.setToLocal(name, value);
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
  private setActiveFontFamily(name: Theme): void {
    this.activeFontFamily = name;
    Object.keys(this.activeFontFamily.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.activeFontFamily.properties[property]
      );
    });
  }
  private setFont = (theme: Theme, font: ENFontStyle) => {
    this.setActiveFont(theme);
    this.saveToLocalStorage(ENFontName.fontStyle, font);
  }
  private setFontFamilyStatus = (name: Theme, font: ENFontFamily) => {
    this.setActiveFontFamily(name);
    this.saveToLocalStorageFontFamily(ENFontFamilyName.fontFamily, font);
  }

  private setFontXXS(): void {
    this.setFont(fontXXS, ENFontStyle.fontXXS);
  }
  private setFontXS(): void {
    this.setFont(fontXS, ENFontStyle.fontXS);
  }
  private setFontSM(): void {
    this.setFont(fontSM, ENFontStyle.fontSM);
  }
  private setFontS(): void {
    this.setFont(fontS, ENFontStyle.fontS);
  }
  private getLastFont = (): ENFontStyle => {
    return this.browserStorageService.getLocal(ENFontName.fontStyle);
  }
  private getLastFontFamily = (): ENFontFamily => {
    return this.browserStorageService.getLocal(ENFontFamilyName.fontFamily);
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
        this.setFontXS();
        break;
    }
  }
  private setFontFamilyBLotus(): void {
    this.setFontFamilyStatus(FontFamilyBLotus, ENFontFamily.BLotus);
  }
  private setFontFamilyBKoodak(): void {
    this.setFontFamilyStatus(FontFamilyBKoodak, ENFontFamily.BKoodak);
  }
  setFontFamily = (name: ENFontFamily) => {
    switch (name) {
      case ENFontFamily.BLotus:
        this.setFontFamilyBLotus();
        break;
      case ENFontFamily.BKoodak:
        this.setFontFamilyBKoodak();
        break;
      default:
        this.setFontFamilyBLotus();
        break;
    }
  }
  // DEAFULT Value of Font Style set in here
  private getFromLocalStorage = (name: ENFontName) => {
    const a = this.browserStorageService.getLocal(name);
    if (a === null) {
      this.setFontXS();
      return;
    }
    this.setFontStyle(this.getLastFont());
  }
  private getFontFamilyFromLocalStorage = (name: ENFontFamilyName) => {
    const a = this.browserStorageService.getLocal(name);
    if (a === null) {
      this.setFontFamilyBLotus();
      return;
    }
    this.setFontFamily(this.getLastFontFamily());
  }

  fontStatus = () => this.getFromLocalStorage(ENFontName.fontStyle);
  fontFamilyStatus = () => this.getFontFamilyFromLocalStorage(ENFontFamilyName.fontFamily);
} 