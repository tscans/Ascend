import calculation from "../calculation/calculation";

const asyncParse = require("async-json-parse");

const userVault = "aav-user";
const dayDataVault = "aav-ddv";

const vault = {
    getUser: () =>{
        let uvs = localStorage.getItem(userVault);
        if(uvs){
            return JSON.parse(uvs);
        }
        return null;
    },
    saveUser:(userObj:any)=>{
        let uos = JSON.stringify(userObj);
        localStorage.setItem(userVault,uos);
    },
    initializeApp:()=>{
        if(localStorage.getItem(dayDataVault)){
            return;
        }
        localStorage.setItem(dayDataVault,JSON.stringify([]));
    },
    reset:()=>{
        localStorage.clear();
    },
    randomId:()=>{
        return `id-${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`;
    },
    addNewDay:async(newDay:newDay)=>{
        let dayLogs = await vault.getDayData();
        newDay.id = vault.randomId();
        dayLogs.push(newDay);
        let strungLogs = JSON.stringify(dayLogs);
        localStorage.setItem(dayDataVault,strungLogs);
        return dayLogs;
    },
    removeDay:async(removeId:string)=>{
        let dayLogs = await vault.getDayData();
        let filteredDayLogs = dayLogs.filter((u:newDay)=>u.id !== removeId);
        let strungLogs = JSON.stringify(filteredDayLogs);
        localStorage.setItem(dayDataVault,strungLogs);
        return filteredDayLogs;
    },
    getDayData:async()=>{
        return await asyncParse(localStorage.getItem(dayDataVault));
    },
    getOneDayData:async(getId:string)=>{
        let dayLogs = await vault.getDayData();
        let oneDay = dayLogs.find((u:newDay)=>u.id === getId);
        return oneDay;
    }
}

interface newDay{
    id?:string;
    dateTime:Date;
    stairsClimed:number;
    minutesSpentClimbing:number;
    calIntakeTarget:number;
    calsBurnedStairs:number;
    weight:number;
    dayOfTheWeek:number;
}

export default vault;

