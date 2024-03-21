import ipValidator from './validators/ipValidator';
import { setText } from './DOM/DOM';
import { fetchData } from './Network/network';
import { toggleTheme, initTheme } from './Theme';
import { getLocalStorageData, saveInLocalStorage } from './LocalStorage';

const utils = {
    ipValidator,
    LocalStorage: { getLocalStorageData, saveInLocalStorage },
    Theme: { toggleTheme, initTheme },
    DOM: {
        setText,
    },
    Network: {
        fetchData,
    },
};

export { utils };
