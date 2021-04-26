import { Imap } from './../../Interfaces/imap';

export enum ENtestMap {
    OSM = 'map[0]',
    Satellite = 'map[1]',
    Esri = 'map[2]',
}
export const map: Imap[] = [
    {
        id: 'OSM',
        mapBoxUrl: '',
        maxZoom: 18,
        minZoom: 6,
        zoom: 11,
        tileSize: 512,
        zoomOffset: -1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    {
        accessToken: '',
        id: 'Satellite',
        mapBoxUrl: '',
        maxZoom: 18,
        minZoom: 6,
        zoom: 11,
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    {
        id: 'Esri',
        mapBoxUrl: 'https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Portland_Parks/FeatureServer/0',
        maxZoom: 18,
        minZoom: 6,
        zoom: 11,
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }


]