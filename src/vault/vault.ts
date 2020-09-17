
import moment from 'moment';

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
        vault.runVaultNotificationSystem();
    },
    updateUserWeight:(weight:string)=>{
        let user = vault.getUser();
        user.weight = weight;
        let uos = JSON.stringify(user);
        localStorage.setItem(userVault,uos);
        vault.runVaultNotificationSystem();
    },
    updateUserTargetWeight:(targetWeight:string)=>{
        let user = vault.getUser();
        user.targetWeight = targetWeight;
        let uos = JSON.stringify(user);
        localStorage.setItem(userVault,uos);
        vault.runVaultNotificationSystem();
    },
    initializeApp:()=>{
        if(localStorage.getItem(dayDataVault)){
            return;
        }
        localStorage.setItem(dayDataVault,JSON.stringify([]));
        window.vaultListener = null;
    },
    setVaultNotifier:(myFunc:any)=>{
        window.vaultListener = myFunc;
    },
    runVaultNotificationSystem:()=>{
        if(window.vaultListener){
            window.vaultListener();
        }
    },
    reset:()=>{
        localStorage.clear();
    },
    clearDayLogs:()=>{
        localStorage.setItem(dayDataVault,JSON.stringify([]));
        vault.runVaultNotificationSystem();
    },
    randomId:()=>{
        return `id-${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`;
    },
    addNewDay:async(newDay:newDay)=>{
        let dayLogs = await vault.getDayData();
        newDay.id = vault.randomId();
        newDay.dateId = moment(newDay.dateTime).format("MM|DD|YYYY");
        dayLogs.push(newDay);
        let strungLogs = JSON.stringify(dayLogs);
        localStorage.setItem(dayDataVault,strungLogs);
        vault.runVaultNotificationSystem();
        return dayLogs;
    },
    removeDay:async(removeId:string)=>{
        let dayLogs = await vault.getDayData();
        let filteredDayLogs = dayLogs.filter((u:newDay)=>u.id !== removeId);
        let strungLogs = JSON.stringify(filteredDayLogs);
        localStorage.setItem(dayDataVault,strungLogs);
        vault.runVaultNotificationSystem();
        return filteredDayLogs;
    },
    getDayData:async()=>{
        return (await asyncParse(localStorage.getItem(dayDataVault)));
    },
    getOneDayData:async(getId:string)=>{
        let dayLogs = await vault.getDayData();
        let oneDay = dayLogs.find((u:newDay)=>u.id === getId);
        return oneDay;
    },
    makeFakeData:(dataNum:number)=>{
        if(!dataNum){
            dataNum = 100;
        }
        vault.clearDayLogs();
        let fakeLogs = [];
        for(let i = 1; i < dataNum; i++){
            fakeLogs.push({
                id:vault.randomId(),
                dateTime:moment(new Date()).subtract(i,"days").toDate(),
                stairsClimbed:Math.round(Math.random() * (4000 - 3000) + 3000),
                minutesSpentClimbing:Math.round(Math.random() * (35 - 25) + 25),
                calIntakeTarget:Math.round(Math.random() * (4 - 1) + 1),
                calsBurnedStairs:Math.round(Math.random() * (900-700) + 700),
                weight:Math.round(Math.random() * (220 - 200) + 200),
                dayOfTheWeek:moment(new Date()).subtract(i,"days").toDate().getDay(),
                totalCaloriesBurned:Math.round(Math.random()*(1100-700)+700),
                dateId:moment(new Date()).subtract(i,"days").format("MM|DD|YYYY")
            })
        }
        fakeLogs.reverse();
        let strungLogs = JSON.stringify(fakeLogs);
        localStorage.setItem(dayDataVault,strungLogs);
        vault.runVaultNotificationSystem();
        return fakeLogs;
    }
}

interface newDay{
    id?:string;
    dateId?:string;
    dateTime:Date;
    stairsClimbed:number;
    minutesSpentClimbing:number;
    calIntakeTarget:number;
    calsBurnedStairs:number;
    totalCaloriesBurned:number;
    weight:number;
    dayOfTheWeek:number;
}

export default vault;

