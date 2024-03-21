import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@maptiler/leaflet-maptilersdk';
import icon from '../../../public/images/icon-location.svg';

export class MapManager {
    constructor(
        { el, initLat = 0, initLng = 0, initZoom = 2 },
        { iconUrl, iconSize },
        key = 'CUrY72wTSLYP6IjMX81I'
    ) {
        if (!el) throw new Error(`${el} is not currect HTML element`);

        this.map = L.map(el, {
            center: L.latLng(initLat, initLng),
            zoom: 2,
        });

        const mtLayer = new L.MaptilerLayer({
            apiKey: key,
        }).addTo(this.map);

        this.myIcon = L.icon({
            iconUrl,
            iconSize,
        });
    }

    setMapView(lat, lng, zoom) {
        if (!this.map) throw new Error('Map has not been initialized. Call createMap first.');

        this.map.setView([lat, lng], zoom);
    }

    addMarker(lat, lng) {
        if (!this.map) throw new Error('Map has not been initialized. Call createMap first.');

        L.marker([lat, lng], { icon: this.myIcon }).addTo(this.map);
    }

    setMapViewWithMarker(lat, lng, zoom) {
        this.setMapView(lat, lng, zoom);
        this.addMarker(lat, lng);
    }
}
