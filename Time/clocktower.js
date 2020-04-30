export default class ClockTower{
    constructor(){
        this.days = 0;
    }
    next(days = 1){
        this.days += days;

        // trigger alarms
        if(this.alarms.has(this.days)){
            this.alarms.get(this.days).forEach(callback=>callback(this.days));
            this.alarms.delete(this.days);
        }

        return this.days;
    }
    get now(){
        return this.days;
    }
    get date(){
        return `${this.year}-${this.month}-${this.day}`;
    }
    get year(){
        return Math.floor(this.days/360);
    }
    get month(){
        return Math.floor(this.days/30)%12 + 1;
    }
    get day(){
        return this.days%30 + 1;
    }
    set alarm({callback,days}){
        if(typeof callback !== "function" || isNaN(days) ){
            return false;
        }
        if(!this.alarms){
            this.alarms = new Map();
        }
        if(!this.alarms.has(days)){
            this.alarms.set(days,[callback]);
            return true;
        }
        let alarms = [].concat(this.alarms.get(days)).concat(callback);
        this.alarms.set(days,alarms);
        return true;
    }
}

// test

let tower = new ClockTower();

let p = new Promise((resolve)=>{

    let r = tower.alarm = {days:20, callback:resolve};

    console.log(`alarm set? ${!!(r)}`);

});
p.then((value)=>{
    console.log(`you slept for ${value} days!!!`);
});


while(tower.month < 2){
    console.log(`date: ${tower.date}`);
    tower.next();
}

