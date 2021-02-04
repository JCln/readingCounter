export interface Imap {
    readonly maxZoom: number;
    readonly minZoom: number;
    readonly tileSize: number;
    readonly zoomOffset: number;
    readonly zoom: number;
    readonly attribution?: string;
    readonly mapBoxUrl?: string;
    readonly accessToken?: string;
    readonly id?: string;
    readonly style?: string;
}
export interface IMapTrackDesc {
    readonly day: string;
    readonly trackNumber: string;
}
