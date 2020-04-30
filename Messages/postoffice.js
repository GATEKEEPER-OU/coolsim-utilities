export default class PostOffice{

    constructor(){

    }


    set collect({message,addressee}){
        if(!this.parcels){
            this.parcels = new Map();
        }
        let parcels = [];
        if(this.parcels.has(addressee)){
            parcels = this.parcels.get(addressee);
        }
        parcels.push(message);
        this.parcels.set(addressee,parcels);
    }

    get deliver(){
        if(!this.parcels){
            return [];
        }
        let parcels = [].concat(this.parcels);
        this.parcels = [];

        return parcels;
    }
}