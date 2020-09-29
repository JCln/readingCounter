import { Imap } from './../../Interfaces/imap';

export const map: Imap[] = [
    {
        id: 'OSM',
        maxZoom: 19,
        minZoom: 7,
        zoom: 10,
        tileSize: 512,
        zoomOffset: -1,
        mapBoxUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    },
    {
        accessToken: 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
        style: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
        id: 'Satellite',
        maxZoom: 19,
        minZoom: 7,
        zoom: 10,
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }


]