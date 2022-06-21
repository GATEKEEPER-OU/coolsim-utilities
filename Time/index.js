import Clock from "./clock.js";
import ClockTower from "./clocktower.js";
import {conditionsCost} from "../Costs/index.js";

const Time = {
    duration,
    Clock,
    ClockTower,
    scaleToRate:scaleToRate,
    rateToScale:rateToScale

};

export default Time;

// calculate duration
// input structure of {hours, errors:[array], extra: [array of conditions]
export function duration({hours, errors},conditions = []){
    if(!hours || !errors){
        throw `{hours, errors} are mandatory fields, got hours: ${hours} and errors: ${errors}`
    }
    // console.log("Time.duration",hours,errors,conditions.length)
    // extra can be a number or an array of conditions
    const extraCost = conditionsCost(conditions);
    const dur = parseFloat(hours);
    let error = errors[Math.floor(Math.random() * errors.length)];
    // console.log('........',error);
    // increase the error considering age and conditions (always slower, thus error is abs)
    error += (Math.abs(error) + extraCost );
    // console.log('-----', dur,error,dur+error);
    return dur + error ;
}


// rate 1 => day
// rate = 0.7 (5/7) workday activity such as working
// rate = 0.14 weekly activity, such as grocery or house keeping
// rate = 0.07 biweekly activity, such as participate to a community meeting
// rate = 0.03 monthly activity, such as GP visit
export function scaleToRate(scale){
    switch (scale){
        case 'day':
            return 1;
        case 'workday':
            return 0.7;
        case 'week':
            return 0.15;
        case 'bi-week':
            return 0.07;
        case 'month':
            return 0.03;
        case 'season':
            return 0.008;
        case 'year':
            return 0.002;
        default:
            return 0;
    }
}
export function rateToScale(rate){
    if(rate == 0) return 'never';
    if(rate <= 0.002) return 'year';
    if(rate <= 0.008) return 'season';
    if(rate <= 0.03) return 'month';
    if(rate <= 0.07) return 'bi-week';
    if(rate <= 0.15) return 'week';
    if(rate <= 0.7) return 'work-day';
    return 'day';
}