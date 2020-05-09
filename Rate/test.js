import Rate from "./index.js";


const list = [
    {label:'death',rate:0, type:"final"},
    {label:'dependent',limit:120,rate:0.1},
    {label:'independent',limit:120,rate:0.3},
    {label:'active',limit:120,type:'default', prev:['independent']}
];
let a = Rate.defaultRate(list);

let r = Rate.pickOne(a);

console.log(a);
// console.log(list);
console.log(r);