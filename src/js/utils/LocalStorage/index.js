function saveInLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorageData(key) {
    const storageData = localStorage.getItem(key);
    if (storageData === 'true') return true;
    if (storageData === 'false') return false;
    return storageData;
}

export { saveInLocalStorage, getLocalStorageData };
