import React from 'react';
import {IonCard,IonSegment,IonSegmentButton,IonLabel,IonModal,
IonButton, IonContent, IonIcon} from '@ionic/react';
import 'react-calendar/dist/Calendar.css';
import './AdditionalCalendar.css';
import moment from 'moment';
import {createOutline} from 'ionicons/icons';
import DayData from './DayData';
import { type } from 'os';
const {Calendar} = require('react-calendar');

interface MyProps{
    data:any;
}

const inverseMap : any = {
    stairsClimbed:1,
    calIntakeTarget:0,
    totalCaloriesBurned:1
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
            <IonCard style={{height:490}}>
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
                {this.renderLegend(minMax)}
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
                <IonContent>
                    <DayData selectedDate={this.state.selectedDate}/>
                    <IonButton 
                    color={"primary"}
                    expand={"full"}
                    onClick={() => this.setState({openModal:false})}>Close</IonButton>
                </IonContent>
            </IonModal>
            </>
        )
    }
    renderLegend = (minMax:any) =>{
        let {valueShown} = this.state;
        let min = minMax.min;
        let max = minMax.max;
        if(inverseMap[valueShown] === 1){
            max = minMax.min;
            min = minMax.max;
        }
        return(
            <div style={styles.legend}>
                <div>
                    {max.toFixed(0)}
                </div>
                <div style={styles.gradient}></div>
                <div>
                    {min.toFixed(0)}
                </div>
            </div>
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
    },
    gradient:{
        background:`linear-gradient(to right, hsla(0,100%,50%,0.4),hsla(60,100%,50%,0.4),
        hsla(120,100%,50%,0.4),hsla(180,100%,50%,0.4))`,
        height:15,
        width:70,
        marginLeft:15,
        marginRight:15
    },
    legend:{
        height:40,
        width:"100%",
        display:'flex',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
}

export default CalendarCard;