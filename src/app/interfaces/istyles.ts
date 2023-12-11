export enum ENFontName {
    fontStyle = 'fontStyle'
}
export enum ENFontStyle {
    fontXXS = 0,
    fontXS = 1,
    fontSM = 2,
    fontS = 3,
}
export enum ENOutputConfigColWidth {
    fontXS = 10,
    fontS = 13,
    fontS2 = 21,
    fontM = 28,
}
export enum ENThemeName {
    themeColor = 'themeColor'
}
export enum ENThemeColor {
    light = 0,
    dark = 1,
    purple = 2,
    bedge = 3,
    corporate = 4,
}
export interface Theme {
    name: string,
    properties: any
}
export enum ENFontFamilyName {
    fontFamily = 'fontFamily'
}
export enum ENFontFamily {
    BLotus = 'BLotus',
    BKoodak = 'BKoodak'
}
export enum ENFontFamilyExactName {
    BLotus = 'B Lotus',
    BKoodak = 'B Koodak',
    BNazanin = 'B Nazanin',
    BYekan = 'B Yekan',
}