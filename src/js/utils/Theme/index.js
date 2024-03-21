import { getLocalStorageData, saveInLocalStorage } from '../LocalStorage';

function toggleTheme() {
    const html = document.querySelector('html');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        saveInLocalStorage('colorTheme', 'light');
        setTheme('light');
    } else {
        setTheme('dark');
        saveInLocalStorage('colorTheme', 'dark');
    }
}

function setTheme(theme) {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
}

function initTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localStorePref = getLocalStorageData('colorTheme');

    if (prefersDarkScheme || localStorePref === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

export { toggleTheme, initTheme };
