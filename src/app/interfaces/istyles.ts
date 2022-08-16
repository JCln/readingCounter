export enum ENFontName {
    fontStyle = 'fontStyle'
}
export enum ENFontStyle {
    fontXXS = 0,
    fontXS = 1,
    fontSM = 3,
    fontS = 2,
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