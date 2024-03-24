import ipValidator from './validators/ipValidator';
import { setElementText } from './DOM/DOM';
import { fetchData } from './Network/network';
import { toggleTheme, initTheme } from './Theme';
import { getLocalStorageData, saveInLocalStorage } from './LocalStorage';

const utils = {
    ipValidator,
    LocalStorage: { getLocalStorageData, saveInLocalStorage },
    Theme: { toggleTheme, initTheme },
    DOM: {
        setElementText,
    },
    Network: {
        fetchData,
    },
};

export { utils };
