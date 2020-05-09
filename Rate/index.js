import {contingencyCost} from "../Costs/index.js";
import {toArray} from "../Misc/index.js";

const Rate = {
    pickOne,
    defaultRate,
    test: testRate,
    check: checkRate,
    rateToSeverity: rateToSeverity,
    severityToRate: severityToRate
};

export default Rate;


/////// RATE FUNCTIONS //////////

export function pickOne(entries,field='rate') {
    let list = toArray(entries);
    let defaultIndex = 0;
    let resultIndex = list.reduce((partial,entry,index)=>{
        if(!entry){return partial;}

        if(entry.type && entry.type === "default"){
            defaultIndex = index;
        }
        // if val is null or 0 is ignored, e.g. rate = 0
        if(!entry[field]){
            return partial;
        }
        if(testRate(entry[field])) {
            return index;
        }
        return partial
    },-1);

    if(resultIndex < 0){
        resultIndex = defaultIndex;
    }
    // console.log('result index',resultIndex, list[resultIndex]);
    return list[resultIndex];
}


// calc ratio of default
export function defaultRate(list = [],field = 'rate'){
    if(list instanceof Map){
        list = Array.from(list.values());
    }
    if(list instanceof Set){
        list = Array.from(list);
    }
    // set default ratio
    let total = list.reduce((sum,e)=> {
        let val = e[field];
        if (val && !isNaN(val)) {
            return e[field] + sum;
        }
        return sum;
    },0);
    list.filter(role=>!!role.type)[0][field] = Math.max(0, (1 - total) );
    return list;
}

// just test a rate
export function testRate(rate){
    let n = Math.random();
    // console.log("???",n, rate, (n <= rate) );
    return (n <= rate);
}

// rate (eg. 0.1, {age,conditions} features of user state and arrays
// modifier: 1, -1 or 0 change the logic of adding or removing contingency cost from rate
export function checkRate(rate,age,conditions,modifier = 1){
    if(isNaN(modifier)){modifier = 1;}
    if(isNaN(rate)){return false;}
    // calc rate
    return ( Math.random() < (rate + (contingencyCost(age,conditions) * rate * modifier) ) );
}




// severity: 0 - 1
// 0 - 0.33 light,
// 0.33000001 - 0.6 mild,
// 0.6 - 1 sever
export function severityToRate(severity){
    switch (severity){
        case 'light':
            return Math.min(1, Math.random() * 0.33333333333 );
        case 'mild':
            return Math.min(1, Math.random() * 0.33333333333 + 0.33333333334 );
        case 'sever':
            return Math.min(1, Math.random() * 3.33333333333 + 0.66666666667 );
        default:
            return 0;
    }
}
export function rateToSeverity(rate){
    if(rate > 0.66666666666) return 'critical';
    if(rate > 0.33333333333) return 'mild';
    if(rate > 0) return 'light';
    return 'none';
}
