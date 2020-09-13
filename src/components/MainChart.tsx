import React from 'react';
import moment from 'moment';
import {Bar} from 'react-chartjs-2';
import {IonCard,IonCardContent} from '@ionic/react';

interface MyProps{
    data:any;
}

class MainChart extends React.Component<MyProps>{
    render(){
        let barData = this.generateData();
        let options = this.generateOptions();
        return(
            <IonCard>
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
        let weightData : any = [];
        let calData :any = [];
        let colorPointData : any = []
        let labelData :any = [];
        let pointStyleData : any = [];
        data.forEach((d:any)=>{
            let dcit = d.calIntakeTarget;
            labelData.push(moment(d.dateTime).format("MM|DD"));
            weightData.push(d.weight);
            calData.push(dcit);
            colorPointData.push(this.citToColor(dcit));
            pointStyleData.push(this.citToSymbol(dcit));
        });
        return {
            labels: labelData,
            datasets: [
                {
                    type: 'line',
                    label: 'Calorie Category',
                    data: calData,
                    borderWidth:0,
                    borderColor:"rgba(0,0,0,0)",
                    pointBorderColor:colorPointData,
                    pointRadius:4,
                    pointStyle:pointStyleData,
                    yAxisID: 'y-axis-1'
                },
                {
                    label: 'Weight',
                    type:'line',
                    data: weightData,
                    fill: true,
                    borderColor: '#0a82d1',
                    backgroundColor: 'rgba(131, 198, 242,0.1)',
                    pointRadius:0,
                    yAxisID: 'y-axis-2'
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
                  display: false,
                  position: 'left',
                  id: 'y-axis-1',
                  ticks:{
                    suggestedMin: 0.5,
                    suggestedMax: 4.5,
                  },
                  gridLines: {
                    display: false
                  }
                },
                {
                  type: 'linear',
                  ticks:{
                    suggestedMin: sMin,
                    suggestedMax: sMax,
                    callback: function(value:any) {
                        return value+" lbs";
                    }
                  },
                  display: true,
                  position: 'left',
                  id: 'y-axis-2',
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
}

export default MainChart;