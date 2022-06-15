import Rate from "./Rate/index.js";
import Time from "./Time/index.js";
import Costs from "./Costs/index.js";
import Messages from "./Messages/index.js";

import {Distribution,toArray,mergeMaps,mergeObjects,merge,extractFromObject,mapToObject} from "./Misc/index.js";




const Utils = {
    cost: Costs,
    rate: Rate,
    time: Time,
    messages: Messages,
    toArray,
    mergeMaps,
    mergeObjects,
    merge,
    extractFromObject,
    mapToObject,
    Distribution
};

export default Utils;

