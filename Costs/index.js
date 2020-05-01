const Costs ={
    ageing: ageingCost,
    conditions: conditionsCost,
    contingency: contingencyCost,
    weight: calcWeight
};

export default Costs;


// cost based on the age beyond a threshold
export function ageingCost(age) {
    // todo improve with a non-linear function
    const threshold = 50;
    // if age > threshold then 1% each year above the threshold
    return (age - threshold) > 0 ? (age - threshold)/100 : 0;
}

// cost based on the number of conditions
export function conditionsCost(conditions = 0) {
    let num = 0;
    // managing different types set, array, maps
    if(Array.isArray(conditions)){
        num += conditions.length;
    } else if(conditions instanceof Set){
        num += conditions.size;
    } else if(conditions instanceof Map){
        num += conditions.size;
    } else if(!isNaN(conditions)){
        num += parseFloat(conditions);
    }
    // todo improve with a non-linear function
    // 1% each condition
    return num/100;
}
// combines const of age and conditions
export function contingencyCost(age = 0, conditions = 0) {
    return ageingCost(age) + conditionsCost(conditions);
}

export function calcWeight(rate,weight,age,conditions, modifier = 1) {
    if(!checkRate(rate,age,conditions,modifier)){
        return 0
    }
    let contingency = contingencyCost(age,conditions);
    return weight + (contingency * weight * modifier);
}


