import { fetchData } from '../utils/Network/network';
import { getLocalStorageData, saveInLocalStorage } from '../utils/LocalStorage';

//? Get user ip service
const GET_USER_IP_SERVICE_URL = 'https://api.ipify.org?format=json';

export const userData = {
    ip: null,
    autoGetting: false,
    autoGetConfirmed: false,
};

function canWeGetYourIp() {
    return confirm('Can we automatically set your ip?');
}

function confirmUserIpAutogetting(isConfirmed) {
    if (!isConfirmed) {
        const isConfirm = canWeGetYourIp();
        saveInLocalStorage('autoGettingConfirmed', true);
        saveInLocalStorage('autoGetting', isConfirm);
    }
}

function setUserIpTrackerPreferences(userDataObj) {
    const autoGetting = getLocalStorageData('autoGetting');
    const autoGettingConfirmed = getLocalStorageData('autoGettingConfirmed');

    if (autoGettingConfirmed === undefined || autoGettingConfirmed === null) {
        confirmUserIpAutogetting(autoGettingConfirmed);
        setUserIpTrackerPreferences(userDataObj);
        return;
    }

    userDataObj.autoGetting = autoGetting;
    userDataObj.autoGetConfirmed = autoGettingConfirmed;
}

async function getUserIp(url) {
    try {
        return await fetchData(url);
    } catch (error) {
        console.error(error);
    }
}

export async function setUserIp(userDataObj, element) {
    setUserIpTrackerPreferences(userDataObj);

    if (userDataObj.autoGetting) {
        const data = await getUserIp(GET_USER_IP_SERVICE_URL);
        if (data) {
            userData.ip = data.ip;
            element.value = userData.ip;
        }
    }
}
