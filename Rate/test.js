import Rate from "./index.js";


const list = [
    {rate:0,label:1,type:"final"},
    {rate:0.2,label:2},
    {rate:0.2,label:3},
    {rate:0.2,label:4},
    {rate:0.2,label:5},
    {type:"default",label:6},
];
let a = Rate.defaultRate(list);

let r = Rate.pickOne(a);

console.log(r);