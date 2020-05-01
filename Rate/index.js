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
    let num = Math.random();
    let defaultIndex = 0;
    let resultIndex = list.reduce((partial,entry,index)=>{
        // console.log('test',num,entry[field],(partial < 0 && num < entry[field]));
        // if val is null or 0 is ignored, e.g. rate = 0
        if(!entry[field]) return partial;
        if(entry.type){defaultIndex = index;}
        if(partial < 0 && num < entry[field]) return index;
        return partial
    },-1);
    if(resultIndex < 0){
        resultIndex = defaultIndex;
    }
    // console.log('result index',resultIndex);
    // console.log('result',list[resultIndex]);
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
    return (Math.random() <= rate);
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
    if(rate == 0) return 'none';
    if(rate <= 0.035) return 'light';
    if(rate <= 0.066) return 'bi-week';
    if(rate <= 0.15) return 'week';
    if(rate <= 0.7) return 'work-day';
    return 'day';
}
