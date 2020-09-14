import React from 'react';
import {IonCard} from '@ionic/react';
import 'react-calendar/dist/Calendar.css';
import './AdditionalCalendar.css';
import moment from 'moment';
const {Calendar} = require('react-calendar');


class CalendarCard extends React.Component{
    state = {
        date:new Date()
    }
    changeDate = (date:Date)=>{
        this.setState({date});
    }
    render(){
        return(
            <IonCard>
                <Calendar 
                    value={this.state.date}
                    showNeighboringMonth={false}
                    onChange={this.changeDate}
                    minDetail={"month"}
                    tileClassName={({date}:any)=>{
                        if(moment(date).format("MM|DD|YYYY")){

                        }
                    }}
                />
            </IonCard>
        )
    }
}

export default CalendarCard;