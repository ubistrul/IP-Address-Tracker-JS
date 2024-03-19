import { utils } from './utils';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
import { map, createMap, setMapView } from './map';

//? Geo.ipify
const IP_APIKEY = `at_NUCWwHBl2qoJCSb7WwHnW270ooBzq`;
const IP_URL_MAIN = `https://geo.ipify.org/api/v2/country,city`;
const IP_URL_APIPART = `?apiKey=`;
const IP_URL_ENDPART = `&ipAddress=`;
const IP_URL_FULL = IP_URL_MAIN + IP_URL_APIPART + IP_APIKEY + IP_URL_ENDPART;

//? Sections
const firstSection = document.querySelector('.tracker__main');
const mapSection = document.querySelector('.tracker__map');

//? Text elements
const ipEl = document.getElementById('ip');
const locationEl = document.getElementById('location');
const timezoneEl = document.getElementById('timezone');
const ispEl = document.getElementById('isp');

const textElementsRefs = {
    ip: ipEl,
    location: locationEl,
    timezone: timezoneEl,
    isp: ispEl,
};

//? Form elements
const trackerFormEl = document.querySelector('.tracker__form');
const trackerInputEl = document.querySelector('.tracker__input');
const trackerButtonEl = document.querySelector('.tracker__button');

document.addEventListener('DOMContentLoaded', appInit);

function appInit() {
    setMapSectionHeight(firstSection, mapSection);
    createMap(map, mapSection);
}

function getData() {}

function setText(el, text) {
    el.textContent = text;
}

trackerInputEl.addEventListener('keyup', (event) => {
    const ip = trackerInputEl.value;

    if (event.key === 'Enter') {
        getTrackerInfo(ip);
    }
});

async function onSubmitHandler(event) {
    event.preventDefault();

    const genStr = (data) => {
        return data ? `, ${data}` : '';
    };

    const searchedIp = trackerInputEl.value;
    const data = await getTrackerInfo(searchedIp);

    const { ip, isp, location } = data;
    const { lat, lng, city, country, postalCode, timezone } = location;

    const timezoneStr = `UTC ${timezone}`;
    const locationStr = `${city}${genStr(country)}${genStr(postalCode)}`;

    displayTextTrackerData({ ip, location: locationStr, timezone: timezoneStr, isp });
    setMapView(map, lat, lng, 10);
}

trackerFormEl.addEventListener('submit', onSubmitHandler);

console.log(utils);

function displayTextTrackerData(data) {
    Object.keys(data).forEach((key) => {
        const el = textElementsRefs[key];
        setText(el, data[key] || '-');
    });
}

function getTrackerInfo(ip) {
    if (!utils.ipValidator(ip)) {
        alert('IP validate error');
        return;
    }

    return fetchData(IP_URL_FULL + ip)
        .then((data) => data)
        .catch((error) => console.log(error));
}

async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

function setMapSectionHeight(firstSection, mapSection) {
    if (!firstSection || !mapSection) {
        return;
    }

    const firstSectionHeight = firstSection.clientHeight;
    mapSection.style.minHeight = `calc(100dvh - (${firstSectionHeight}px))`;
}

// const map = L.map(mapEl).setView([51.505, -0.09], 1);
