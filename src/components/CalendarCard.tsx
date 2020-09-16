import React from 'react';
import {IonCard,IonSegment,IonSegmentButton,IonLabel,IonModal,
IonButton} from '@ionic/react';
import 'react-calendar/dist/Calendar.css';
import './AdditionalCalendar.css';
import moment from 'moment';
import DayData from './DayData';
const {Calendar} = require('react-calendar');

interface MyProps{
    data:any;
}

const inverseMap : any = {
    stairsClimbed:0,
    calIntakeTarget:1,
    totalCaloriesBurned:0
};

class CalendarCard extends React.Component<MyProps>{
    state = {
        date:new Date(),
        valueShown:"stairsClimbed",
        monthView:(new Date()).getMonth(),
        selectedDate:null,
        openModal:false
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
            <>
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
                    showNeighboringMonth={false}
                    onClickDay={this.selectDate}
                    minDetail={"month"}
                    onActiveStartDateChange={({activeStartDate}:any)=>this.setState({
                        monthView:(activeStartDate).getMonth()
                    })}
                    tileContent={({date}:any)=>{
                        let dateInfo = fdoa.obj[moment(date).format("MM|DD|YYYY")];
                        if(dateInfo){
                            let givenValue = dateInfo[valueShown];
                            let normVal = Math.abs(inverseMap[valueShown] - ((givenValue-minMax.min)/
                            (minMax.max - minMax.min)));
                            let tokenColor = `hsla(${(180 - ((normVal)*180))},100%,50%,0.4)`;
                            return(
                                <div style={{
                                    position:'relative',
                                    backgroundColor:tokenColor,
                                    height:"90%",
                                    width:"90%",
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <div>
                                    {date.getDate()}
                                    <br/>
                                    <span style={styles.small}>
                                        {dateInfo.weight}
                                    </span>
                                    </div>
                                </div>
                            )
                        }
                        return date.getDate()
                    }}
                    tileClassName={"cc-pad"}
                />
            </IonCard>
            <IonModal isOpen={this.state.openModal} >
                <DayData selectedDate={this.state.selectedDate}/>
                <IonButton 
                color={"secondary"}
                onClick={() => this.setState({openModal:false})}>Close</IonButton>
            </IonModal>
            </>
        )
    }
    selectDate = (a:any) =>{
        let {data} = this.props;
        let dateId = moment(a).format("MM|DD|YYYY");
        let foundDate = data.find((u:any)=>{
            return u.dateId === dateId;
        });
        if(foundDate){
            this.setState({selectedDate:foundDate,openModal:true});
        }
    }
}

const styles = {
    small:{
        fontSize:9
    }
}

export default CalendarCard;