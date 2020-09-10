const minimumCalories = 1200;
const caloricDifferential = 500;


const calculation = {
    basalMetabolicRateFormula: (bmrObj:bmrObj)=>{
        if(bmrObj.gender === "male"){
            return Math.floor(
                (10 * calculation.poundsToKilo(bmrObj.weight)) + 
                (6.25 * calculation.inchesToCm(bmrObj.height)) - 
                (5 * bmrObj.age) + 
                5);
        }else{
            return Math.floor(
                (10 * calculation.poundsToKilo(bmrObj.weight)) + 
                (6.25 * calculation.inchesToCm(bmrObj.height)) - 
                (5 * bmrObj.age) - 
                161);
        }
    },
    poundsToKilo:(lbs:number)=>{
        return lbs * 0.453592;
    },
    inchesToCm:(inches:number)=>{
        return inches * 2.54;
    },
    targetCalories:(bmrObj:bmrObj)=>{
        let bmr = calculation.basalMetabolicRateFormula({
            gender:bmrObj.gender,
            weight:bmrObj.weight,
            height:bmrObj.height,
            age:bmrObj.age
        });
        let mtc = bmr - caloricDifferential;
        if(mtc < minimumCalories){
            mtc = minimumCalories;
        }
        return {
            one:mtc,
            two:(bmr + mtc)/2,
            three:bmr + caloricDifferential,
            four:bmr + (caloricDifferential*2)
        }
    },
    stairsCalorieEstimate:(stairsCalObj:stairsCalObj)=>{
        let spm = calculation.spmEst(stairsCalObj.numStairs,stairsCalObj.minutesClimbing);
        let res = (calculation.poundsToKilo(stairsCalObj.weight) *
        stairsCalObj.minutesClimbing / 200 * 3.5 * calculation.metEst(spm));
        if(isNaN(res)){
            res = 0;
        }
        return Math.floor(res);
    },
    metEst:(spm:number)=>{
        return (1/340)*(Math.pow(spm,(16/9)))+2;
    },
    spmEst:(numStairs:number,minutesClimbing:number)=>{
        let res = Math.floor((numStairs)/(minutesClimbing));
        if(isNaN(res)){
            return 0;
        }
        if(res > 180){
            return 180;
        }
        return res;
    },
    getCurrentAge:(yearBorn:number)=>{
        return (new Date()).getFullYear() - yearBorn;
    }
};

interface bmrObj {
    gender: string;
    weight:number;
    height:number;
    age:number;
}

interface stairsCalObj {
    numStairs:number;
    minutesClimbing:number;
    weight:number;
}

/*
30,4
60,6
90,11
120,16.5
150,21
*/

export default calculation;