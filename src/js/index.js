import { userData, setUserIp } from './userSettings/userSettings';

//? Utils
import { utils } from './utils';
const { fetchData } = utils.Network;
const { setElementText } = utils.DOM;
const { toggleTheme, initTheme } = utils.Theme;

//? Map preferences
import { MapManager } from './map';
import icon from './../../public/images/icon-location.svg';
const customIcon = { iconUrl: icon, iconSize: [46, 56] };
let map = {};

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

const textElementRefs = {
    ip: ipEl,
    location: locationEl,
    timezone: timezoneEl,
    isp: ispEl,
};

//? Form elements
const trackerFormEl = document.querySelector('.tracker__form');
const trackerInputEl = document.querySelector('.tracker__input');
const trackerButtonEl = document.querySelector('.tracker__button');

//? Theme
const themeSwitcherEl = document.getElementById('theme-switcher');
themeSwitcherEl.addEventListener('click', () => {
    toggleTheme();
});

//? EVENTS
document.addEventListener('DOMContentLoaded', appInit);

trackerInputEl.addEventListener('keyup', keyUpEnterHandler);

trackerFormEl.addEventListener('submit', onSubmitHandler);

function appInit() {
    initTheme();
    setUserIp(userData, trackerInputEl);
    setMapSectionHeight(firstSection, mapSection);
    map = new MapManager(
        {
            el: mapSection,
            initLat: 0,
            initLng: 0,
            initZoom: 2,
        },
        customIcon
    );
}

function keyUpEnterHandler(event) {
    const ip = trackerInputEl.value;

    if (event.key === 'Enter') {
        getTrackerInfo(ip);
    }
}

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
    map.setMapViewWithMarker(lat, lng, 15);
}

function displayTextTrackerData(data) {
    Object.keys(data).forEach((key) => {
        const el = textElementRefs[key];
        setElementText(el, data[key] || '-');
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

window.addEventListener('resize', () => {
    if (window.innerWidth > 559) {
        setMapSectionHeight(firstSection, mapSection);
    }
});

function setMapSectionHeight(firstSection, mapSection) {
    if (!firstSection || !mapSection) {
        return;
    }

    const firstSectionHeight = firstSection.clientHeight;
    mapSection.style.minHeight = `calc(100dvh - (${firstSectionHeight}px))`;
}
