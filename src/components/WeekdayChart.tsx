import React from 'react';
import {Bar} from 'react-chartjs-2';
import {IonCard,IonCardContent,IonSegment,IonSegmentButton,IonLabel} from '@ionic/react';

interface MyProps{
    data:any;
}

class WeekdayChart extends React.Component<MyProps>{
    state = {
        valueShown:"stairs"
    }
    render(){
        let barData = this.generateData();
        let options = this.generateOptions();
        console.log("segment",this.state.valueShown);
        return(
            <IonCard>
                <IonSegment onIonChange={e => this.setState({valueShown:e.detail.value})}>
                    <IonSegmentButton value="stairs">
                        <IonLabel>Stair Count</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="consume">
                        <IonLabel>Calorie Target</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="burn">
                        <IonLabel>Burned Calories</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <IonCardContent>
                    <Bar
                        data={barData}
                        options={options}
                        height={250}
                    />
                </IonCardContent>
            </IonCard>
        )
    }
    generateData = () =>{
        let {data} = this.props;
        let {valueShown} = this.state;
        let stairsClimbed = Array.from({length:this.dow.length},()=>0);
        let intakeTarget = Array.from({length:this.dow.length},()=>0);
        let totalCals = Array.from({length:this.dow.length},()=>0);
        let dowt = Array.from({length:this.dow.length},()=>0);
        data.forEach((d:any)=>{
            let dotwi = d.dayOfTheWeek;
            dowt[dotwi] = dowt[dotwi] + 1;
            stairsClimbed[dotwi] = stairsClimbed[dotwi] + d.stairsClimbed;
            intakeTarget[dotwi] = intakeTarget[dotwi] + d.calIntakeTarget;
            totalCals[dotwi] = totalCals[dotwi] + d.totalCaloriesBurned;
        });
        dowt.forEach((count:number,position:number)=>{
            stairsClimbed[position] = stairsClimbed[position] / count;
            intakeTarget[position] = intakeTarget[position] / count;
            totalCals[position] = totalCals[position] / count;
        });
        let usedData = stairsClimbed;
        console.log(usedData,valueShown)
        if(valueShown === "consume"){
            usedData = intakeTarget;
        }else if(valueShown === "burn"){
            usedData = totalCals;
        }
        return {
            labels: this.dow,
            datasets: [
                {
                    type: 'bar',
                    label: 'Calorie Category',
                    data: usedData,
                    borderWidth:3,
                    borderColor: '#0a82d1',
                    backgroundColor: 'rgba(131, 198, 242,0.1)',
                    yAxisID: 'y-axis-1'
                }
            ]
        };
    }
    generateOptions = () =>{
        let {data} = this.props;
        let sMin = 1000;
        let sMax = 0;
        data.forEach((d:any)=>{
            if(d.weight > sMax){
                sMax = d.weight;
            }
            if(d.weight < sMin){
                sMin = d.weight;
            }
        });
        let diff = Math.abs(sMax - sMin);
        sMin = sMin - (diff/2);
        sMax = sMax + (diff/2);
        return {
            responsive: true,
            legend:{
                display:false
            },
            tooltips: {
              mode: 'label'
            },
            elements: {
              line: {
                fill: false
              }
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  gridLines: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  id: 'y-axis-1',
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
        };
    }
    citToColor = (cit:number) =>{
        return `hsl(${(180 - ((cit-1)*60))},100%,70%)`;
    }
    citToSymbol = (cit:number) =>{
        if(cit === 1 || cit === 2){
            return "circle"
        }
        return "cross"
    }
    dow = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
}

export default WeekdayChart;