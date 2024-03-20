import { utils } from './utils';
const { fetchData } = utils.network;
const { setText } = utils.DOM;

import { MapManager } from './map/main';

//? Geo.ipify
const IP_APIKEY = `at_NUCWwHBl2qoJCSb7WwHnW270ooBzq`;
const IP_URL_MAIN = `https://geo.ipify.org/api/v2/country,city`;
const IP_URL_APIPART = `?apiKey=`;
const IP_URL_ENDPART = `&ipAddress=`;
const IP_URL_FULL = IP_URL_MAIN + IP_URL_APIPART + IP_APIKEY + IP_URL_ENDPART;

//? Get user ip service
const GET_USER_IP_SERVICE_URL = 'https://api.ipify.org?format=json';

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

//? User data
const userData = {
    ip: null,
    autoGetting: false,
    autoGetConfirmed: false,
};

//? Map
let map = {};

document.addEventListener('DOMContentLoaded', appInit);

function appInit() {
    setUserIp(userData);
    setMapSectionHeight(firstSection, mapSection);
    map = new MapManager({
        el: mapSection,
        initLat: 0,
        initLng: 0,
        initZoom: 2,
    });
    // map.setMapView(0, 0, 2);
}

function canWeGetYourIp() {
    return confirm('Can we automatically set your ip?');
}

function saveInLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorageData(key) {
    const storageData = localStorage.getItem(key);
    if (storageData === 'true') return true;
    if (storageData === 'false') return false;
    return storageData;
}

function setUserIpTrackerPreferences(userDataObj) {
    const autoGetting = getLocalStorageData('autoGetting');
    const autoGettingConfirmed = getLocalStorageData('autoGettingConfirmed');

    if (autoGettingConfirmed === undefined || autoGettingConfirmed === null) {
        confirmUserIpAutoget(autoGettingConfirmed);
        setUserIpTrackerPreferences(userDataObj);
        return;
    }

    userDataObj.autoGetting = autoGetting;
    userDataObj.autoGetConfirmed = autoGettingConfirmed;
}

function confirmUserIpAutoget(isConfirmed) {
    if (!isConfirmed) {
        const isConfirm = canWeGetYourIp();
        saveInLocalStorage('autoGettingConfirmed', true);
        saveInLocalStorage('autoGetting', isConfirm);
    }
}

async function setUserIp(userDataObj) {
    setUserIpTrackerPreferences(userDataObj);

    if (userDataObj.autoGetting) {
        const data = await getUserIp(GET_USER_IP_SERVICE_URL);
        if (data) {
            userData.ip = data.ip;
            trackerInputEl.value = userData.ip;
        }
    }
}

async function getUserIp(url) {
    try {
        return await fetchData(url);
    } catch (error) {
        console.error(error);
    }
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
    map.setMapView(lat, lng, 15);
    map.addMarker(lat, lng, 15);
}

trackerFormEl.addEventListener('submit', onSubmitHandler);

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

function setMapSectionHeight(firstSection, mapSection) {
    if (!firstSection || !mapSection) {
        return;
    }

    const firstSectionHeight = firstSection.clientHeight;
    mapSection.style.minHeight = `calc(100dvh - (${firstSectionHeight}px))`;
}

// const map = L.map(mapEl).setView([51.505, -0.09], 1);
