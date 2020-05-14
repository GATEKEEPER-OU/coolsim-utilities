import Billboard from "./billboard.js";


// test

let board = new Billboard();

board.publish = {
    message:{
        recipient:'me',
        addressee:'nurse',
        content:'help!'
    },
    topic: 'random'
};
board.publish = {
    message:{
        recipient:'me',
        addressee:'neighbour',
        content:'party at my place!'
    },
    topic: 'party'
};


// console.log("read now the board, sections:\n",board.sections);
let section = board.sections[0];
// console.log(`read now section ${section}\n
${board.read('random')}`);

let m = board.read('random')[0];

board.taken = {message: m, topic: 'random'};

// console.log("read again",board.read('random'));