// list of stores
// description of store for each entity type
// list of dbs to for each entity
// each db is described by
//      name of the db
//      connection, either, from, to or sync
//          - from: string with the path to the db from which it should get data
//          - to: string with the path to the db to which it should push data
//          - sync: string to the path to the db to sync with


const STORES = new Map(Object.entries(
    {
        agent:{
            logs:{
                to:"agents-logs",
                name:"agent-logs",
                fields:["date"]
            },
            state:{
                to:"agents-state",
                name:"agent-state",
                fields:[]
            },
        },
        area:{
            logs:{
                name:"area-logs",
                fields:["name","date"]
            },
            residents:{
                name:"area-state",
                fields:["name"]
            },
            places:{
                to:"area-places",
                name:"area-places",
                fields:["name"]
            },
        },
        place:{
            logs:{
                to:"places-logs",
                name:"place-logs",
                fields:["name","date"]
            },
            visits:{
                to:"places-visits",
                name:"place-visits",
                fields:["date"]
            },
        }
    },
));


export default STORES;