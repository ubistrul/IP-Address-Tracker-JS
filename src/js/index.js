const IP_APIKEY = `at_NUCWwHBl2qoJCSb7WwHnW270ooBzq`;

const IP_URL_MAIN = `https://geo.ipify.org/api/v2/country,city`;
const IP_URL_APIPART = `?apiKey=`;
const IP_URL_ENDPART = `&ipAddress=`;
const IP_URL_FULL = IP_URL_MAIN + IP_URL_APIPART + IP_APIKEY + IP_URL_ENDPART;

const ipEl = document.getElementById('ip');
const locationEl = document.getElementById('location');
const timezoneEl = document.getElementById('timezone');
const ispEl = document.getElementById('isp');

document.addEventListener('DOMContentLoaded', getData);

function setText(el, text) {
    el.textContent = text;
}
