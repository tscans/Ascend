import React from 'react';
import {IonCard,IonSegment,IonSegmentButton,IonLabel} from '@ionic/react';
import 'react-calendar/dist/Calendar.css';
import './AdditionalCalendar.css';
import moment from 'moment';
const {Calendar} = require('react-calendar');

interface MyProps{
    data:any;
}

class CalendarCard extends React.Component<MyProps>{
    state = {
        date:new Date(),
        valueShown:"stairsClimbed",
        monthView:(new Date()).getMonth()
    }
    changeDate = (date:Date)=>{
        this.setState({date});
    }
    render(){
        let data = this.props.data;
        let {valueShown} = this.state;
        let fdoa = data.filter((obj:any)=>{
            if(new Date(obj.dateTime).getMonth() === this.state.monthView){
                return true;
            }
        }).reduce((acc:any,curr:any)=>{
            acc.obj[curr.dateId] = curr;
            acc.arr.push(curr);
            return acc;
        },{obj:{},arr:[]});
        console.log(fdoa.arr)
        let minMax = fdoa.arr.reduce((acc:any,curr:any)=>{
            if(acc.min > curr[valueShown]){
                acc.min = curr[valueShown];
            }
            if(acc.max < curr[valueShown]){
                acc.max = curr[valueShown];
            }
            return acc;
        },{min:1000000,max:0});
        return(
            <IonCard style={{height:450}}>
                <IonSegment 
                onIonChange={e => this.setState({valueShown:e.detail.value})}
                value={this.state.valueShown}>
                    <IonSegmentButton value="stairsClimbed">
                        <IonLabel>Stair Count</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="calIntakeTarget">
                        <IonLabel>Calorie Target</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="totalCaloriesBurned">
                        <IonLabel>Burned Calories</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <Calendar 
                    value={this.state.date}
                    showNeighboringMonth={false}
                    onChange={this.changeDate}
                    minDetail={"month"}
                    onActiveStartDateChange={({activeStartDate}:any)=>this.setState({
                        monthView:(activeStartDate).getMonth()
                    })}
                    tileContent={({date}:any)=>{
                        let dateInfo = fdoa.obj[moment(date).format("MM|DD|YYYY")];
                        if(dateInfo){
                            let givenValue = dateInfo[valueShown];
                            let normVal = (givenValue-minMax.min)/(minMax.max - minMax.min);
                            let tokenColor = `hsla(${(180 - ((normVal)*180))},100%,70%,0.5)`;
                            return(
                                <div style={{
                                    position:'relative',
                                    backgroundColor:tokenColor,
                                    height:"100%",
                                    width:"100%",
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    {date.getDate()}
                                </div>
                            )
                        }
                        return date.getDate()
                    }}
                    tileClassName={"cc-pad"}
                />
            </IonCard>
        )
    }
}

export default CalendarCard;