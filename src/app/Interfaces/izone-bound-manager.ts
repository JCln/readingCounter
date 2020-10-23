export interface IZoneBoundManager {
    id: number;
    title: string;
    zoneId: number;
    govermentalCode: string;
    fromEshterak: string;
    toEshterak: string;
    fromRadif: number;
    toRadif: number;
    host: string;
    dbUserName: string;
    dbPassword: string;
    dbInitialCatalog: string;
}
