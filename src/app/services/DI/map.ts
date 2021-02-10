import { Imap } from './../../Interfaces/imap';

export const map: Imap[] = [
    {
        id: 'OSM',
        mapBoxUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        maxZoom: 18,
        minZoom: 6,
        zoom: 11,
        tileSize: 512,
        zoomOffset: -1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    {
        accessToken: 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        id: 'Satellite',
        mapBoxUrl: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        maxZoom: 18,
        minZoom: 6,
        zoom: 11,
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }


]