import Store from "./index";


// test
let s = new Store("agent");


s.save("logs",{date:"2020-05-02"})
    .then(val=>console.log(val))
    .catch(err=>console.error(err));

s.readBySection("logs",{date:"2020-05-02"})
    .then(val=>console.log(val))
    .catch(err=>console.error(err));

s.cleanup();