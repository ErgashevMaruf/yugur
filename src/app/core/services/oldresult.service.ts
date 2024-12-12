import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OldresultService {

constructor() { }
    eventsList= [{
        index:0,
        eventName:"Tashkent Marafon",
        raceDistance:"3km",
        eventDate:"01.04.2024",
        participants:1200,
        uzsPriceCalculated:'500 000'
    },
    {
        index:1,
        eventName:"Samarqand Marafon",
        raceDistance:"5km",
        eventDate:"10.05.2024",
        participants:1100,
        uzsPriceCalculated:'300 000'
    },
    {
        index:2,
        eventName:"Xalqaro Marafon",
        raceDistance:"5km",
        eventDate:"11.04.2024",
        participants:3000,
        uzsPriceCalculated:'600 000'
    }
]
    oldResultRunner0 = [{
        name:'Шахром',
        surname:'Абдурахмонов',
        bibCode:'3066',
        place:'1',
        placeGender:'4',
        gunTime:'09:15',
        chipTime:'09:12'
    },
    {
        name:'Eldor',
        surname:'Batirov',
        bibCode:'3010',
        place:'2',
        placeGender:'40',
        gunTime:'09:23',
        chipTime:'09:12'
    },
    {
        name:'Курбонзада',
        surname:'Умерчон',
        bibCode:'3016',
        place:'3',
        placeGender:'4',
        gunTime:'09:15',
        chipTime:'09:12'
    },
    {
        name:'Elyor',
        surname:'BOXODIROV',
        bibCode:'4066',
        place:'9',
        placeGender:'4',
        gunTime:'-',
        chipTime:'-'
    }
]
oldResultRunner1 = [{
    name:'Ergashev',
    surname:'Maruf',
    bibCode:'6333',
    place:'1',
    placeGender:'1',
    gunTime:'09:15',
    chipTime:'09:12'
},
{
    name:'Shodiyev',
    surname:'Dilshod',
    bibCode:'4040',
    place:'2',
    placeGender:'5',
    gunTime:'09:30',
    chipTime:'09:40'
},
{
    name:'Botirov',
    surname:'Farhod',
    bibCode:'5050',
    place:'4',
    placeGender:'4',
    gunTime:'09:15',
    chipTime:'09:12'
},
{
    name:'Xayrullayev',
    surname:'Zuhriddin',
    bibCode:'1066',
    place:'5',
    placeGender:'6',
    gunTime:'-',
    chipTime:'-'
}
]
oldResultRunner2 = [{
    name:'TURDIEV',
    surname:'Javohir',
    bibCode:'5066',
    place:'1',
    placeGender:'4',
    gunTime:'09:15',
    chipTime:'09:12'
},
{
    name:'Islom',
    surname:'Tursunqulov',
    bibCode:'1066',
    place:'1',
    placeGender:'3',
    gunTime:'09:20',
    chipTime:'09:25'
},
{
    name:'Elbek',
    surname:'Abdurhimov',
    bibCode:'8066',
    place:'4',
    placeGender:'4',
    gunTime:'-',
    chipTime:'-'
},
{
    name:'Шахром',
    surname:'Абдурахмонов',
    bibCode:'3256',
    place:'1',
    placeGender:'10',
    gunTime:'-',
    chipTime:'-'
}
]
}
