export default class ClockTower{
    constructor(){
        this.days = 0;
    }
    next(days = 1){
        this.days += days;
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

}

// test

let tower = new ClockTower();

while(tower.year < 10){
    console.log(`date: ${tower.date}`);
    tower.next(30);
}

