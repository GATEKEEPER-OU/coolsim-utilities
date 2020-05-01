// billboard provides a system to publish messages in an area / place
// a board is structured in sections
// a section is defined with a unique string
// to publish it is required {message, section}
// a message can be a string, object
// for instance message: {recipient, addressee, content}

export default class Billboard{
    constructor(){
        this.board = {};
    }

    set publish({message,section}){
        if(!this.board[section]){
            this.board[section] = new Set();
        }
        this.board[section].add(message);
    }

    read(section){
        if(!section || !this.board[section]){
            return this.board;
        }
        return Array.from(this.board[section]);
    }

    set taken({message,section}){
        if(!section || !this.board[section]){
            return false;
        }
        this.board[section].delete(message);
        return message;
    }
    get sections(){
        return Object.keys(this.board);
    }
}
