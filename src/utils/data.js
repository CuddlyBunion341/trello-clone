import { v4 as uuid } from 'uuid';

const data = {
    [uuid()]: {
        name:'Todo',
        cards:[
            {id:uuid(),title:'Item 1'},
            {id:uuid(),title:'Item 2'},
            {id:uuid(),title:'Item 3'},
        ]
    },
    [uuid()]: {
        name:'Doing',
        cards:[
            {id:uuid(),title:'Item 4'},
            {id:uuid(),title:'Item 5'},
        ]
    },
    [uuid()]: {
        name:'Done',
        cards:[
            {id:uuid(),title:'Item 6'}
        ]
    },
};
data["listOrder"] = Object.keys(data);

console.log({data});

export default data;