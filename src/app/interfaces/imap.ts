export interface Imap {
    id: string;
    maxZoom: number;
    minZoom: number;
    tileSize: number;
    zoomOffset: number;
    zoom: number;
    attribution?: string;
    mapBoxUrl: string;
    accessToken?: string;
}
export interface IMapTrackDesc {
    readonly day: string;
    readonly trackNumber: string;
}
