import ipValidator from './validators/ipValidator';
import { setText } from './DOM/DOM';
import { fetchData } from './network/network';

const utils = {
    ipValidator,
    DOM: {
        setText,
    },
    network: {
        fetchData,
    },
};

export { utils };
