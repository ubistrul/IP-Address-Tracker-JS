import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@maptiler/leaflet-maptilersdk';

export class MapManager {
    constructor({ el, initLat = 0, initLng = 0, initZoom = 2 }, key = 'CUrY72wTSLYP6IjMX81I') {
        if (!el) throw new Error(`${el} is not current HTML element`);

        this.map = L.map(el, {
            center: L.latLng(initLat, initLng),
            zoom: 2,
        });

        const mtLayer = new L.MaptilerLayer({
            apiKey: key,
        }).addTo(this.map);
    }

    setMapView(lat, lng, zoom) {
        if (!this.map) throw new Error('Map has not been initialized. Call createMap first.');

        this.map.setView([lat, lng], zoom);
    }

    addMarker(lat, lng) {
        if (!this.map) throw new Error('Map has not been initialized. Call createMap first.');

        L.marker([lat, lng]).addTo(this.map);
    }
}
