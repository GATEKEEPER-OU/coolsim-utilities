import ClockTower from "./clocktower.js";
import Clock from "./clock.js";

// test

// let tower = new ClockTower();
//
// let p = new Promise((resolve)=>{
//
//     let r = tower.alarm = {days:20, callback:resolve};
//
//     // console.log(`alarm set? ${!!(r)}`);
//
// });
// p.then((value)=>{
//     // console.log(`you slept for ${value} days!!!`);
// });
//
//
// while(tower.month < 2){
//     // console.log(`date: ${tower.date}`);
//     tower.next();
// }


let c = new Clock("hour");


console.log("till tomorrow",c.tillTomorrow);