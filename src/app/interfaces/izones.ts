export interface ICountryManager {
    id: number;
    title: string;
}
export interface IProvinceManager {
    readonly id: number;
    title: string;
    countryId: number;
    dynamicId: any;
    logicalOrder: number;
}
export interface IRegionManager {
    readonly id: number;
    provinceId: number | string;
    logicalOrder: number;
    title: string;
    connectionString: string,
    dynamicId: any
}
export interface IZoneManager {
    title: string;
    id: number;
    regionId: number | string;
    isMetro: boolean
    logicalOrder: number;
    dynamicId: any,
    fromEshterak: string,
    toEshterak: string,
    fromPostalCode: string,
    toPostalCode: string,
    isPermitted: boolean
}
export interface IZoneBoundManager {
    id: number;
    title: string;
    zoneId: number;
    dynamicId: any;
    govermentalCode: number;
    fromEshterak: string;
    toEshterak: string;
    fromRadif: number;
    toRadif: number;
    host: string;
    dbUserName: string;
    dbPassword: string;
    dbInitialCatalog: string;
}
