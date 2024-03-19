import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@maptiler/leaflet-maptilersdk';

let map;

function createMap(map, el) {
    const key = 'CUrY72wTSLYP6IjMX81I';

    if (!el) throw new Error('There is no div with the id: "app" ');

    map = L.map(el, {
        center: L.latLng(0, 0),
        zoom: 15,
    });

    // Create a MapTiler Layer inside Leaflet
    const mtLayer = new L.MaptilerLayer({
        // Get your free API key at https://cloud.maptiler.com
        apiKey: key,
    }).addTo(map);
}

function setMapView(map, lat, lng, zoom) {
    if (!map) throw new Error('Map has not been initialized. Call createMap first.');

    map.setView([lat, lng], zoom);
}

export { map, createMap, setMapView };
