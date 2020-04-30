import Clock from './clock.js';

export default Time = {
    duration,
    Clock,
    scaleToRate:scaleToRate,
    rateToScale:rateToScale

};



// calculate duration
// input structure of {hours, errors:[array], extra: [array of conditions]
export function duration({hours, errors},conditions = 0){
    // extra can be a number or an array of conditions
    let extraCost = conditionsCost(conditions);
    let duration = parseFloat(hours);
    let error = errors[Math.floor(Math.random() * errors.length)];
    // console.log('........',error);
    // increase the error considering age and conditions (always slower, thus error is abs)
    error += (Math.abs(error) + extraCost );
    // console.log('-----', duration,error,duration+error);
    return duration + error ;
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