import * as Utils from "./index.js";


let m = new Map();

m.set("a",1);
m.set("b",2);
m.set("c",3);
m.set("d",4);
m.set("e",5);


let o = Utils.mapToObject(m);


console.log(o);